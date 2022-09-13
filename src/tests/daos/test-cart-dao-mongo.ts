import { v4 } from 'uuid';
import CartsDao from '../../modules/cart/carts-dao-mongo';
import { parseCartProduct } from '../../utils/parsers';
import { testFunction } from '../tests';

export const testCartDaoMongo = async () => {
  await testFunction('save()', async () => {
    await CartsDao.dao.save({ id: '0', products: [], timestamp: Date.now() });
    await CartsDao.dao.save({ id: '1', products: [], timestamp: Date.now() });
    await CartsDao.dao.save({ id: '2', products: [], timestamp: Date.now() });
  });

  await testFunction('getAll()', async () => {
    const res = await CartsDao.dao.getAll();
    console.log(res);
  });

  await testFunction('getById()', async () => {
    const res = await CartsDao.dao.getById('0');
    console.log(res);
  });

  await testFunction('updateById()', async () => {
    const newCartProd = parseCartProduct({ id: v4(), quantity: 1 });
    if (!newCartProd) return;
    await CartsDao.dao.updateById('0', { products: [newCartProd] });
    const updated = await CartsDao.dao.getAll();
    console.log('After update id:"0" {id: v4(), quantity: 1}:', updated);
  });

  await testFunction('deleteById()', async () => {
    await CartsDao.dao.deleteById('0');
    const res = await CartsDao.dao.getAll();
    console.log('After delete id:"0":', res);
  });

  await testFunction('deleteAll()', async () => {
    await CartsDao.dao.deleteAll();
    const res = await CartsDao.dao.getAll();
    console.log('After delete:', res);
  });
  console.log('\nFinished testing cartDaoMongo\n');
};
