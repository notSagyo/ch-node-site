import { iCart } from './models';

export interface iDao<T> {
  save(data?: Partial<T>): Promise<boolean>;
  getById(id: string): Promise<T | null>;
  getAll(): Promise<T[]>;
  updateById(id: string, data: Partial<T>): Promise<boolean>;
  deleteById(id: string): Promise<boolean>;
  deleteAll(): Promise<boolean>;
}

export interface iCartDao extends iDao<iCart> {
  addProductById(cartId: string, productId: string, quantity?: number): Promise<boolean>;
  removeProductById(cartId: string, productId: string): Promise<boolean>;
}
