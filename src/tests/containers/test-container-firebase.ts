import { where } from '@firebase/firestore';
import { v4 } from 'uuid';
import Container from '../../containers/container-firebase';
import { ProductDto } from '../../types/dtos';
import { testFunction } from '../tests';

export const testContainerFirebase = async () => {
  const container = new Container<ProductDto>('products');

  await testFunction('insert()', async () => {
    await container.insert({ id: v4(), name: 'Test', price: 100 });
    await container.insert({ id: v4(), name: 'Test2', price: 100 });
    await container.insert({ id: v4(), name: 'Test3', price: 100 });
  });

  await testFunction('find() ALL', async () => {
    const res = await container.find('*');
    console.log(res);
  });

  await testFunction('find() {name: Test}', async () => {
    const res = await container.find(where('name', '==', 'Test'));
    console.log(res);
  });

  await testFunction('find() NON-EXISTENT', async () => {
    const res = await container.find(where('name', '==', 'guayaba'));
    console.log(res);
  });

  await testFunction('update()', async () => {
    await container.update(where('name', '==', 'Test'), { name: 'Updated!' });
    const updated = await container.find('*');
    console.log('After update name Test => Updated!:', updated);
  });

  await testFunction('delete()', async () => {
    await container.delete(where('name', '==', 'Updated!'));
    const res = await container.find('*');
    console.log('After delete {name: "Updated!"}:', res);
  });

  await testFunction('delete() ALL', async () => {
    await container.delete('*');
    const res = await container.find('*');
    console.log('After delete ALL', res);
  });

  console.log('\nFinished testing containerFirebase\n');
};
