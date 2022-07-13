import { testContainers } from './containers/test-container';
import { testDaos } from './daos/test-daos';
import { testNormalizr } from './test-normalizr';

export const testFunction = async (name: string, callback: () => Promise<void> | void) => {
  try {
    console.log(`> START test ${name} ------------------------------------<`);
    await callback();
    console.log('> END test\n');
  } catch (err) {
    console.error(err);
  }
};

(async () => {
  await testContainers();
  await testDaos();
  await testNormalizr();
  console.log('> FINISHED ALL TESTS');
})();
