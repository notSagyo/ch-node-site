import { testCartDaoFirebase } from './test-cart-dao-firebase';
import { testCartDaoMongo } from './test-cart-dao-mongo';
import { testProductDaoFirebase } from './test-product-dao-mongo';
import { testProductDaoMongo } from './test-product-dao-firebase';

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
