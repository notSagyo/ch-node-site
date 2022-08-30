import { v4 } from 'uuid';
import Container from '../../containers/container-mongo';
import { productsModel } from '../../models/product';
import { iProduct } from '../../types/models';
import { testFunction } from '../tests';

export const testContainerMongo = async () => {
  const container = new Container<iProduct>(productsModel);

  await testFunction('connect()', async () => {
    await container.connect();
  });

  await testFunction('close()', async () => {
    await container.disconnect();
  });

  await testFunction('insert()', async () => {
    await container.insert({ id: v4(), name: 'Test', price: 100 });
    await container.insert({ id: v4(), name: 'Test2', price: 100 });
    await container.insert({ id: v4(), name: 'Test3', price: 100 });
  });

  await testFunction('find() ALL', async () => {
    const res = await container.find({});
    console.log(res);
  });

  await testFunction('find() {name: "Test"}', async () => {
    const res = await container.find({ name: 'Test' });
    console.log(res);
  });

  await testFunction('find() NON-EXISTENT', async () => {
    const res = await container.find({ name: 'papaya' });
    console.log(res);
  });

  await testFunction('update()', async () => {
    await container.update({ name: 'Test' }, { name: 'Test999' });
    const updated = await container.find({});
    console.log('After update name Test => Test999:', updated);
  });

  await testFunction('delete()', async () => {
    await container.delete({ name: 'Test999' });
    const res = await container.find({});
    console.log('After delete Test999:', res);
  });

  await testFunction('delete() ALL', async () => {
    await container.delete({});
    const res = await container.find({});
    console.log('After delete ALL', res);
  });

  console.log('\nFinished testing containerMongo\n');
};
