import { graphqlHTTP } from 'express-graphql';
import { CartDto, ProductDtoPayload } from '../../types/dtos';
import { importGqlSchema } from '../../utils/utils';
import cartService from './cart.service';

// Queries ===================================================================//
const getCartById = async (args: { id: string }) =>
  await cartService.getCartById(args.id);

const getAllCarts = async () => (await cartService.getAllCarts()) || [];

// Mutations =================================================================//
const addCart = async (product: ProductDtoPayload) =>
  await cartService.createCart(product);

const addProductById = async ({
  cartId,
  productId,
}: {
  cartId: string;
  productId: string;
}) => cartService.addProductById(cartId, productId);

const editCart = async ({ args }: { args: CartDto & { id: string } }) => {
  const { id, ...cart } = args;
  return await cartService.updateCartById(id, cart);
};

const schema = importGqlSchema('cart.gql');

export const gqlMiddleware = graphqlHTTP({
  schema,
  rootValue: { getCartById, getAllCarts, addCart, editCart, addProductById },
  graphiql: true,
});
