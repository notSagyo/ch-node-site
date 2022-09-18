import { v4 } from 'uuid';
import CartDao from '../../modules/cart/cart.dao.firebase';
import { parseCartProduct } from '../../utils/parsers';
import { testFunction } from '../tests';

export const testCartDaoFirebase = async () => {
  await testFunction('save()', async () => {
    await CartDao.dao.save({ id: '0', products: [], timestamp: Date.now() });
    await CartDao.dao.save({ id: '1', products: [], timestamp: Date.now() });
    await CartDao.dao.save({ id: '2', products: [], timestamp: Date.now() });
  });

  await testFunction('getAll()', async () => {
    const res = await CartDao.dao.getAll();
    console.log(res);
  });

  await testFunction('getById()', async () => {
    const res = await CartDao.dao.getById(
      '0d59a48a-31ed-4b0b-ad17-60a35d9cbafc'
    );
    console.log(res);
  });

  await testFunction('updateById()', async () => {
    const newCartProd = parseCartProduct({ id: v4(), quantity: 1 });
    if (!newCartProd) return;
    await CartDao.dao.updateById('0d59a48a-31ed-4b0b-ad17-60a35d9cbafc', {
      products: [newCartProd],
    });
    const updated = await CartDao.dao.getAll();
    console.log('After update id:"0" {id: v4(), quantity: 1}:', updated);
  });

  await testFunction('addProductById()', async () => {
    await CartDao.dao.addProductById(
      '0d59a48a-31ed-4b0b-ad17-60a35d9cbafc',
      '6666666'
    );
    const updated = await CartDao.dao.getAll();
    console.log('After add product "id":6666666 :', updated);
  });

  await testFunction('removeProductById()', async () => {
    await CartDao.dao.removeProductById(
      '0d59a48a-31ed-4b0b-ad17-60a35d9cbafc',
      '6666666'
    );
    const updated = await CartDao.dao.getAll();
    console.log('After remove product "id":6666666 :', updated);
  });

  await testFunction('deleteById()', async () => {
    await CartDao.dao.deleteById('0');
    const res = await CartDao.dao.getAll();
    console.log('After delete id:"0":', res);
  });

  // await testFunction('deleteAll()', async () => {
  //   await CartsDao.dao.deleteAll();
  //   const res = await CartsDao.dao.getAll();
  //   console.log('After delete:', res);
  // });

  console.log('\nFinished testing cartDaoFirebase\n');
};
