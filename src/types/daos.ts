import Cart from 'src/cart/entities/cart.entity';

export interface IDao<T> {
  save(data?: T): Promise<boolean>;
  getById(id: string): Promise<T | null>;
  getAll(): Promise<T[]>;
  updateById(id: string, data: Partial<T>): Promise<boolean>;
  deleteById(id: string): Promise<boolean>;
  deleteAll(): Promise<boolean>;
}

export interface ICartDao extends IDao<Cart> {
  addProductById(
    cartId: string,
    productId: string,
    quantity?: number,
  ): Promise<boolean>;
  removeProductById(cartId: string, productId: string): Promise<boolean>;
}
