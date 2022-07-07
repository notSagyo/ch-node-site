import { iCartProduct } from '../types';
import { validate } from 'uuid';

export const parseCartProduct = (obj: Record<string, unknown> | Partial<iCartProduct>): iCartProduct | null => {
  const isValidQuantity = typeof obj?.quantity === 'number' && obj.quantity > 0;
  const isValidTimestamp = typeof obj?.timestamp === 'number' && obj.timestamp > 0;
  const isValidCode = typeof obj?.code === 'string' && obj.code.length > 0;
  const isValidId = typeof obj?.id === 'string' && validate(obj.id);
  if (!isValidId)
    return null;

  const quantity = isValidQuantity ? obj.quantity as number : 1;
  const timestamp = isValidTimestamp ? obj.timestamp as number : Date.now();
  const code = isValidCode ? obj.code as string : '-1';
  const id = obj.id as string;

  return({
    id,
    code,
    quantity,
    timestamp
  });
};
