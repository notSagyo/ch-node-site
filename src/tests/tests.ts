import { testContainerFirebase } from './containers/testContainerFirebase';
import { testContainerMongo } from './containers/testContainerMongo';
import { testCartDaoFirebase } from './daos/testCartDaoFirebase';
import { testCartDaoMongo } from './daos/testCartDaoMongo';
import { testProductDaoFirebase } from './daos/testProductDaoFirebase';
import { testProductDaoMongo } from './daos/testProductDaoMongo';

export const testFunction = async (name: string, callback: () => Promise<void>) => {
  try {
    console.log(`> START test ${name} ------------------------------------<`);
    await callback();
    console.log('> END test\n');
  } catch (err) {
    console.error(err);
  }
};

(async () => {
  console.log('\n> testContainerMongo ==============================================<');
  await testContainerMongo();
  console.log('\n> testContainerFirebase ==============================================<');
  await testContainerFirebase();
  console.log('\n> testProductDaoMongo ==============================================<');
  await testProductDaoMongo();
  console.log('\n> testProductDaoFirebase ==============================================<');
  await testProductDaoFirebase();
  console.log('\n> testCartDaoMongo ==============================================<');
  await testCartDaoMongo();
  console.log('\n> testCartDaoFirebase ==============================================<');
  await testCartDaoFirebase();
  console.log('> FINISHED ALL TESTS');
})();
