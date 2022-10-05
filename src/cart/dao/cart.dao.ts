import CartDaoFirebase from './cart.dao.firebase';
import CartDaoKnex from './cart.dao.knex';
import CartDaoMongo from './cart.dao.mongo';

const CartDao = CartDaoMongo;
export default CartDao;
