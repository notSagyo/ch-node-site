import ProductDao from '../../modules/product/product.dao.firebase';
import { testFunction } from '../tests';

export const testProductDaoMongo = async () => {
  await testFunction('save()', async () => {
    await ProductDao.dao.save({ id: '0', name: 'Test', price: 100 });
    await ProductDao.dao.save({ id: '1', name: 'Test2', price: 100 });
    await ProductDao.dao.save({ id: '2', name: 'Test3', price: 100 });
  });

  await testFunction('getAll()', async () => {
    const res = await ProductDao.dao.getAll();
    console.log(res);
  });

  await testFunction('getById()', async () => {
    const res = await ProductDao.dao.getById('0');
    console.log(res);
  });

  await testFunction('updateById()', async () => {
    await ProductDao.dao.updateById('0', { name: 'Test999' });
    const updated = await ProductDao.dao.getAll();
    console.log('After update id:"0" name Test => Test999:', updated);
  });

  await testFunction('deleteById()', async () => {
    await ProductDao.dao.deleteById('0');
    const res = await ProductDao.dao.getAll();
    console.log('After delete id:"0":', res);
  });

  await testFunction('deleteAll()', async () => {
    await ProductDao.dao.deleteAll();
    const res = await ProductDao.dao.getAll();
    console.log('After delete:', res);
  });

  console.log('\nFinished testing productDaoMongo\n');
};
