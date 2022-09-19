import { validate } from 'uuid';
import { CartProductDto } from '../types/dtos';
import { IParser } from '../types/types';

export const parseCartProduct: IParser<CartProductDto> = (prod) => {
  const isValidCode = typeof prod?.code === 'string' && prod.code.length > 0;
  const isValidId = typeof prod?.id === 'string' && validate(prod.id);
  const isValidTimestamp =
    typeof prod?.timestamp === 'number' && prod.timestamp > 0;
  const isValidQuantity =
    typeof prod?.quantity === 'number' && prod.quantity > 0;

  if (!isValidId) return null;

  const quantity = isValidQuantity ? (prod.quantity as number) : 1;
  const timestamp = isValidTimestamp ? (prod.timestamp as number) : Date.now();
  const code = isValidCode ? (prod.code as string) : '-1';
  const id = prod.id as string;

  return { id, code, quantity, timestamp };
};
