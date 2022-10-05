import { Injectable } from '@nestjs/common';
import { ProductService } from 'src/product/product.service';
import { CartProductDto, ProductDto } from 'src/types/dtos';
import { ICartService } from 'src/types/services';
import CartDao from './dao/cart.dao';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import Cart, { parseCart } from './entities/cart.entity';

@Injectable()
export class CartService implements ICartService {
  // Cart Methods ============================================================//
  async createCart(cartDto: CreateCartDto): Promise<Cart> {
    const cart = Cart.fromDto(cartDto);
    const success = await CartDao.dao.save(cart);
    if (!success) throw new Error('Cart service: error saving cartDto');
    return cart;
  }

  async getAllCarts(): Promise<Cart[]> {
    return await CartDao.dao.getAll();
  }

  async getCartById(id: string): Promise<Cart | null> {
    return await CartDao.dao.getById(id);
  }

  async deleteCartById(cartId: string): Promise<boolean> {
    return await CartDao.dao.deleteById(cartId);
  }

  async deleteAllCarts(): Promise<boolean> {
    return await CartDao.dao.deleteAll();
  }

  async updateCartById(
    cartId: string,
    data: Partial<UpdateCartDto>,
  ): Promise<boolean> {
    const exists = (await this.getCartById(cartId)) != null;
    if (exists) return await CartDao.dao.updateById(cartId, data);

    const parsedProd = parseCart(data);
    if (parsedProd) return await CartDao.dao.save(Cart.fromDto(parsedProd));

    return false;
  }

  // Cart Products Methods ===================================================//
  async getAllProducts(cartId: string): Promise<CartProductDto[]> {
    const cart = await CartDao.dao.getById(cartId);
    if (!cart) return [];
    const items = cart.products;
    return items;
  }

  // TODO: Stack products
  async addProductById(
    cartId: string,
    productId: string,
    quantity = 1,
  ): Promise<boolean> {
    return await CartDao.dao.addProductById(cartId, productId, quantity);
  }

  async removeProductById(cartId: string, productId: string): Promise<boolean> {
    return await CartDao.dao.removeProductById(cartId, productId);
  }

  async removeAllProducts(cartId: string): Promise<boolean> {
    return await CartDao.dao.updateById(cartId, { products: [] });
  }

  async cartProductsToProducts(cartProds: CartProductDto[]) {
    const promises = [];
    const products: ProductDto[] = [];

    for (let i = 0; i < cartProds.length; i++) {
      const cartProd = cartProds[i];
      promises.push(new ProductService().getProductById(cartProd.id));
    }

    await Promise.allSettled(promises).then((results) =>
      results.forEach(
        (result) =>
          result.status === 'fulfilled' &&
          result.value &&
          products.push(result.value),
      ),
    );

    return products;
  }
}

const cartService = new CartService();

export default cartService;
