import { testContainerFirebase } from './testContainerFirebase';
import { testContainerMongo } from './testContainerMongo';

export const testContainers = async () => {
  console.log('\n> testContainerMongo ==============================================<');
  await testContainerMongo();
  console.log('\n> testContainerFirebase ==============================================<');
  await testContainerFirebase();
};
