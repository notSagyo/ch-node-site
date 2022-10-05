import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { ejsDefaultData } from 'src/config/ejs';
import { ProductDto } from 'src/types/dtos';
import { logger } from 'src/utils/logger';
import { cartViewDir } from 'src/utils/paths';
import { CartService } from './cart.service';
import { CreateCartProductDto } from './dto/create-cart-product.dto';

// Views =====================================================================//
@ApiTags('views')
@Controller('cart')
export class CartControllerViews {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @ApiResponse({ description: 'Renders cart view' })
  async getCartPage(@Req() req: Request, @Res() res: Response) {
    const userId = req.user?.id;
    const cartProds = userId
      ? await this.cartService.getAllProducts(userId)
      : [];
    let prods: ProductDto[] = [];

    if (cartProds.length > 0)
      prods = await this.cartService.cartProductsToProducts(cartProds);

    res.render(cartViewDir, {
      ...ejsDefaultData,
      cartProducts: prods,
    });
  }
}

// API =======================================================================//
@ApiTags('cart')
@Controller('api/cart')
export class CartControllerApi {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async getAllCarts() {
    const carts = await this.cartService.getAllCarts();
    return carts;
  }

  @Get(':cartId')
  async getCartProducts(@Param('cartId') cartId: string, @Res() res: Response) {
    const products = await this.cartService.getAllProducts(cartId);
    res.status(200).json(products);
  }

  @Get(':cartId')
  getCart(@Param('cartId') cartId: string) {
    const cart = this.cartService.getCartById(cartId);
    if (cart == null)
      throw new HttpException(`Cart ${cartId} not found`, HttpStatus.NOT_FOUND);
    return cart;
  }

  @Post()
  async postCart(@Req() req: Request) {
    const userId = req.user?.id;
    const success = userId
      ? await this.cartService.createCart({ id: userId })
      : false;
    return success;
  }

  @Delete(':cartId')
  async deleteCart(@Param('cartId') cartId: string) {
    return await this.cartService.deleteCartById(cartId);
  }

  @Post(':cartId/products')
  async postCartProduct(
    @Param() cartId: string,
    @Req() req: Request,
    @Body() body: CreateCartProductDto,
  ) {
    const productId = body.id;
    cartId = cartId == '0' ? req.user?.id : cartId;

    // If cart doesn't exists create it
    if (cartId) {
      const foundCart = await this.cartService.getCartById(cartId);
      if (foundCart == null) {
        logger.warn('Cart not found, creating...');
        await this.cartService.createCart({ id: cartId });
      }
    }

    // Try add prodduct to cart
    const success = cartId
      ? await this.cartService.addProductById(cartId, productId)
      : false;

    if (success == false) {
      const msg = '400: Error while saving product in cart';
      logger.error(msg);
      throw new HttpException(msg, HttpStatus.BAD_REQUEST);
    }
    return 'Product added succesfully';
  }

  @Delete(':cartId/products')
  async deleteCartProductById(
    @Param('cartId') cartId: string,
    @Body() productId: string,
  ) {
    return await this.cartService.removeProductById(cartId, productId);
  }
}
