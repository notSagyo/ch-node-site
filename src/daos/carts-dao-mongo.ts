import Container from '../containers/container-mongo';
import { cartModel } from '../models/cart';
import { iCart, iCartProduct } from '../types/models';
import { iCartDao } from '../types/daos';
import { v4 } from 'uuid';

export default class CartsDao implements iCartDao {
  container = new Container(cartModel);

  async save(cart?: Partial<iCart>) {
    const cartWithId: iCart = {
      id: v4() ,
      products: cart?.products || [],
      timestamp: cart?.timestamp || Date.now()
    };
    return await this.container.insert(cartWithId);
  }

  async getById(id: string) {
    const res = await this.container.find({ id });
    const product = res ? res[0] : null;
    return product;
  }

  async getAll(): Promise<iCart[]> {
    return await this.container.find({}) || [];
  }

  async updateById(id: string, data: Partial<iCart>) {
    return await this.container.update({ id }, data);
  }

  async deleteById(id: string) {
    return await this.container.delete({ id });
  }

  async deleteAll() {
    return await this.container.delete({});
  }

  // Product methods =========================================================//
  async addProductById(cartId: string, productId: string, quantity?: number) {
    let success = false;
    const cartProd: iCartProduct = {
      id: productId,
      quantity: quantity || 1,
      code: '',
      timestamp: Date.now()
    };

    try {
      await this.container.update({ id: cartId }, { $push: { products: cartProd} });
      success = true;
    } catch (error) {
      console.log(error);
    }
    return success;
  }

  async removeProductById(cartId: string, productId: string) {
    let success = false;
    try {
      await this.container.update({ id: cartId }, { $pull: { products: { id: productId }} });
      success = true;
    } catch (error) {
      console.log(error);
    }
    return success;
  }
}

export const cartsDao = new CartsDao();
