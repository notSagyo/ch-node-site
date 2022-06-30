import { iCartProduct } from '../types';

export default class Cart {
  // Manual ID input will be ignored when saved in the container
  id: number;
  timestamp: number;
  products: iCartProduct[];

  constructor(products?: iCartProduct[], timestamp?: number, id?: number) {
    this.products = products || [];
    this.timestamp = timestamp || Date.now();
    this.id = id || 0;
  }

  addProduct(product: iCartProduct) {
    Cart.addProduct(this, product);
  }

  deleteProduct(productId: number) {
    Cart.deleteProduct(this, productId);
  }

  // Static Methods ==========================================================//
  static addProduct(cart: Cart, product: iCartProduct) {
    const lastId = cart.products.length > 0 ? cart.products[cart.products.length - 1].id : 0;
    const newId = lastId ? lastId + 1 : 0;
    cart.products.push({ ...product, id: newId });
    return newId;
  }

  static deleteProduct(cart: Cart, productId: number) {
    const index = cart.products.findIndex(prod => prod.id == productId);
    if (index === -1) return;
    cart.products.splice(index, 1);
    return productId;
  }
}
