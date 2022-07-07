import { testCartDaoFirebase } from './testCartDaoFirebase';
import { testCartDaoMongo } from './testCartDaoMongo';
import { testProductDaoFirebase } from './testProductDaoFirebase';
import { testProductDaoMongo } from './testProductDaoMongo';

export const testDaos = async () => {
  console.log('\n> testProductDaoMongo ==============================================<');
  await testProductDaoMongo();
  console.log('\n> testProductDaoFirebase ==============================================<');
  await testProductDaoFirebase();
  console.log('\n> testCartDaoMongo ==============================================<');
  await testCartDaoMongo();
  console.log('\n> testCartDaoFirebase ==============================================<');
  await testCartDaoFirebase();
};
