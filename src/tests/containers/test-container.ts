import { testContainerFirebase } from './test-container-firebase';
import { testContainerMongo } from './test-container-mongo';

export const testContainers = async () => {
  console.log('\n> testContainerMongo ==============================================<');
  await testContainerMongo();
  console.log('\n> testContainerFirebase ==============================================<');
  await testContainerFirebase();
};
