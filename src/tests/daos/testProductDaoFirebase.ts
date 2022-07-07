import { productsDao } from '../../daos/productsDaoFirebase';
import { testFunction } from '../tests';

export const testProductDaoFirebase = async () => {
  await testFunction('save()', async () => {
    await productsDao.save({ id: '0', name: 'Test', price: 100 });
    await productsDao.save({ id: '1', name: 'Test2', price: 100 });
    await productsDao.save({ id: '2', name: 'Test3', price: 100 });
  });

  await testFunction('getAll()', async () => {
    const res = await productsDao.getAll();
    console.log(res);
  });

  await testFunction('getById()', async () => {
    const res = await productsDao.getById('0');
    console.log(res);
  });

  await testFunction('updateById()', async () => {
    await productsDao.updateById('0', { name: 'Test999' });
    const updated = await productsDao.getAll();
    console.log('After update id:"0" name Test => Test999:', updated);
  });

  await testFunction('deleteById()', async () => {
    await productsDao.deleteById('0');
    const res = await productsDao.getAll();
    console.log('After delete id:"0":', res);
  });


  await testFunction('deleteAll()', async () => {
    await productsDao.deleteAll();
    const res = await productsDao.getAll();
    console.log('After delete:', res);
  });
  console.log('\nFinished testing productDaoFirebase\n');
};
