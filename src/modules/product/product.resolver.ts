import { graphqlHTTP } from 'express-graphql';
import { ProductDto as ProductDto, ProductDtoPayload } from '../../types/dtos';
import { importGqlSchema } from '../../utils/utils';
import productService from './product.service';

// Queries ===================================================================//
const getProductById = async (args: { id: string }) =>
  await productService.getProductById(args.id);

const getAllProducts = async () =>
  (await productService.getAllProducts()) || [];

// Mutations =================================================================//
const addProduct = async (product: ProductDtoPayload) =>
  await productService.createProduct(product);

const editProduct = async ({ args }: { args: ProductDto & { id: string } }) => {
  const { id, ...prod } = args;
  return await productService.updateProductById(id, prod);
};

const schema = importGqlSchema('product.gql');

export const gqlMiddleware = graphqlHTTP({
  schema,
  rootValue: { getProductById, getAllProducts, addProduct, editProduct },
  graphiql: true,
});
