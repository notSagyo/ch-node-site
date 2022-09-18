import CartsDaoFirebase from './carts-dao-firebase';
import CartsDaoKnex from './carts-dao-knex';
import CartsDaoMongo from './carts-dao-mongo';

const CartsDao = CartsDaoMongo;
export default CartsDao;
