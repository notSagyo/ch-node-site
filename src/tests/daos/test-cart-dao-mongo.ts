import { v4 } from 'uuid';
import { parseCartProduct } from '../../modules/cart/cart';
import CartDao from '../../modules/cart/cart.dao.mongo';
import { testFunction } from '../tests';

export const testCartDaoMongo = async () => {
  await testFunction('save()', async () => {
    await CartDao.dao.save({ id: '0', products: [], timestamp: Date.now() });
    await CartDao.dao.save({ id: '1', products: [], timestamp: Date.now() });
    await CartDao.dao.save({ id: '2', products: [], timestamp: Date.now() });
  });

  await testFunction('getAll()', async () => {
    const res = await CartDao.dao.getAll();
    console.log(res);
  });

  await testFunction('getById()', async () => {
    const res = await CartDao.dao.getById('0');
    console.log(res);
  });

  await testFunction('updateById()', async () => {
    const newCartProd = parseCartProduct({ id: v4(), quantity: 1 });
    if (!newCartProd) return;
    await CartDao.dao.updateById('0', { products: [newCartProd] });
    const updated = await CartDao.dao.getAll();
    console.log('After update id:"0" {id: v4(), quantity: 1}:', updated);
  });

  await testFunction('deleteById()', async () => {
    await CartDao.dao.deleteById('0');
    const res = await CartDao.dao.getAll();
    console.log('After delete id:"0":', res);
  });

  await testFunction('deleteAll()', async () => {
    await CartDao.dao.deleteAll();
    const res = await CartDao.dao.getAll();
    console.log('After delete:', res);
  });
  console.log('\nFinished testing cartDaoMongo\n');
};
