import path from 'path';
import { productsDao } from '../daos/products-dao-mongo';
import { iCartProduct, iProduct } from '../types/models';

export const baseDir = path.join(__dirname, '..', '..');
export const publicDir = path.join(baseDir, 'public');
export const uploadsDir = path.join(publicDir, 'uploads');

export const cartProductsToProducts = async (cartProds: iCartProduct[]) => {
  const promises = [];
  const products: iProduct[] = [];

  for (let i = 0; i < cartProds.length; i++) {
    const element = cartProds[i];
    promises.push(productsDao.getById(element.id));
  }

  await Promise.allSettled(promises).then((results) =>
    results.forEach(
      (result) =>
        result.status === 'fulfilled' &&
        result.value &&
        products.push(result.value)
    )
  );

  return products;
};

export const validateEmail = (email: string) => {
  const regex = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  return regex.test(email);
};
