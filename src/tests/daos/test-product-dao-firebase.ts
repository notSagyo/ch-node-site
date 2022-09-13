import ProductsDao from '../../modules/product/products-dao-firebase';
import { testFunction } from '../tests';

export const testProductDaoMongo = async () => {
  await testFunction('save()', async () => {
    await ProductsDao.dao.save({ id: '0', name: 'Test', price: 100 });
    await ProductsDao.dao.save({ id: '1', name: 'Test2', price: 100 });
    await ProductsDao.dao.save({ id: '2', name: 'Test3', price: 100 });
  });

  await testFunction('getAll()', async () => {
    const res = await ProductsDao.dao.getAll();
    console.log(res);
  });

  await testFunction('getById()', async () => {
    const res = await ProductsDao.dao.getById('0');
    console.log(res);
  });

  await testFunction('updateById()', async () => {
    await ProductsDao.dao.updateById('0', { name: 'Test999' });
    const updated = await ProductsDao.dao.getAll();
    console.log('After update id:"0" name Test => Test999:', updated);
  });

  await testFunction('deleteById()', async () => {
    await ProductsDao.dao.deleteById('0');
    const res = await ProductsDao.dao.getAll();
    console.log('After delete id:"0":', res);
  });

  await testFunction('deleteAll()', async () => {
    await ProductsDao.dao.deleteAll();
    const res = await ProductsDao.dao.getAll();
    console.log('After delete:', res);
  });

  console.log('\nFinished testing productDaoMongo\n');
};
