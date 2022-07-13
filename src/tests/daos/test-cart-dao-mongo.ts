import { v4 } from 'uuid';
import { cartsDao } from '../../daos/carts-dao-mongo';
import { parseCartProduct } from '../../utils/parsers';
import { testFunction } from '../tests';

export const testCartDaoMongo = async () => {
  await testFunction('save()', async () => {
    await cartsDao.save({ id: '0', products: [], timestamp: Date.now() });
    await cartsDao.save({ id: '1', products: [], timestamp: Date.now() });
    await cartsDao.save({ id: '2', products: [], timestamp: Date.now() });
  });

  await testFunction('getAll()', async () => {
    const res = await cartsDao.getAll();
    console.log(res);
  });

  await testFunction('getById()', async () => {
    const res = await cartsDao.getById('0');
    console.log(res);
  });

  await testFunction('updateById()', async () => {
    const newCartProd = parseCartProduct({ id: v4(), quantity: 1 });
    if (!newCartProd)
      return;
    await cartsDao.updateById('0', { products: [newCartProd] });
    const updated = await cartsDao.getAll();
    console.log('After update id:"0" {id: v4(), quantity: 1}:', updated);
  });

  await testFunction('deleteById()', async () => {
    await cartsDao.deleteById('0');
    const res = await cartsDao.getAll();
    console.log('After delete id:"0":', res);
  });


  await testFunction('deleteAll()', async () => {
    await cartsDao.deleteAll();
    const res = await cartsDao.getAll();
    console.log('After delete:', res);
  });
  console.log('\nFinished testing cartDaoMongo\n');
};
