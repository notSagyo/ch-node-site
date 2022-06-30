import { parseProduct } from '../product/product';
import { iCartProduct } from '../types';

export const parseCartProduct = (obj: Record<string, unknown> | Partial<iCartProduct>): iCartProduct | null => {
  const parsedProd = parseProduct(obj);
  if (!parsedProd)
    return null;

  const isValidQuantity = typeof obj?.quantity === 'number' && obj.quantity > 0;
  const isValidTimestamp = typeof obj?.timestamp === 'number' && obj.timestamp > 0;
  const isValidCode = typeof obj?.code === 'string' && obj.code.length > 0;

  const quantity = isValidQuantity ? obj.quantity as number : 1;
  const timestamp = isValidTimestamp ? obj.timestamp as number : Date.now();
  const code = isValidCode ? obj.code as string : '-1';

  return({
    id: parsedProd.id,
    name: parsedProd.name,
    price: parsedProd.price,
    thumbnail: parsedProd.thumbnail,
    description: parsedProd.description,
    code,
    quantity,
    timestamp
  });
};
