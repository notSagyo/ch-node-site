import ProductDao from '../modules/product/product.dao';
import { CartProductDto, ProductDto } from '../types/dtos';

export const cartProductsToProducts = async (cartProds: CartProductDto[]) => {
  const promises = [];
  const products: ProductDto[] = [];

  for (let i = 0; i < cartProds.length; i++) {
    const element = cartProds[i];
    promises.push(ProductDao.dao.getById(element.id));
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
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  return regex.test(email);
};
