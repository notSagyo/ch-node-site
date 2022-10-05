import { v4, validate } from 'uuid';
import { ProductDto } from '../../types/dtos';
import { IParser } from '../../types/types';
import { logger } from '../../utils/logger';
import { CreateProductDto } from '../dto/create-product.dto';

export default class Product implements ProductDto {
  id: string;
  name: string;
  price: number;
  thumbnail: string;
  description: string;

  constructor(
    id: string,
    name: string,
    price: number,
    thumbnail: string,
    description: string,
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.thumbnail = thumbnail;
    this.description = description;
  }

  static fromDto(dto: CreateProductDto): Product {
    const parsedProd = parseProduct(dto);
    if (parsedProd == null) throw new Error('Product: error parsing product');
    return new Product(
      parsedProd.id,
      parsedProd.name,
      parsedProd.price,
      parsedProd.thumbnail,
      parsedProd.description,
    );
  }

  toDto(): ProductDto {
    const { id, description, name, price, thumbnail } = this;
    return { id, description, name, price, thumbnail };
  }
}

export const parseProduct: IParser<CreateProductDto> = (prod) => {
  const isValidName = typeof prod?.name === 'string' && prod.name.length > 0;
  const isValidId = typeof prod?.id === 'string' && validate(prod.id);
  const isValidDescription = typeof prod?.description === 'string';
  const isValidPrice =
    prod?.price && !isNaN(Number(prod?.price)) && Number(prod?.price) > 0;
  const isValidThumbnail =
    typeof prod?.thumbnail === 'string' && prod?.thumbnail.length > 0;

  const id = isValidId ? (prod.id as string) : v4();
  const name = isValidName ? (prod.name as string) : null;
  const price = isValidPrice ? Number(prod.price) : null;
  const thumbnail = isValidThumbnail ? (prod.thumbnail as string) : '';
  const description = isValidDescription ? (prod.description as string) : '';

  if (name == null) logger.error('Invalid product name:', prod?.name);
  if (price == null) logger.error('Invalid product price:', prod?.price);

  if (name != null && price != null)
    return { id, name, price, thumbnail, description };
  return null;
};
