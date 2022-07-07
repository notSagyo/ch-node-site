import { iCart, iCartProduct } from '../types';

// TODO: Delete this class
export default class Cart {
  // Manual ID input will be ignored when saved in the container
  id: string;
  timestamp: number;
  products: iCartProduct[];

  constructor(products?: iCartProduct[], timestamp?: number, id?: string) {
    this.products = products || [];
    this.timestamp = timestamp || Date.now();
    this.id = id || '0';
  }

  addProduct(product: iCartProduct) {
    Cart.addProduct(this, product);
  }

  deleteProduct(productId: string) {
    Cart.deleteProduct(this, productId);
  }

  // Static Methods ==========================================================//
  static addProduct(cart: iCart, product: iCartProduct) {
    const lastId = cart.products.length > 0 ? cart.products[cart.products.length - 1].id : '0';
    const newId = (Number(lastId) + 1).toString();
    cart.products.push({ ...product, id: newId });
    return newId;
  }

  static deleteProduct(cart: iCart, productId: string) {
    const index = cart.products.findIndex(prod => prod.id == productId);
    if (index === -1) return;
    cart.products.splice(index, 1);
    return productId;
  }
}
