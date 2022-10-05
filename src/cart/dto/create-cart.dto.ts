import { CartDto, CartProductDto } from 'src/types/dtos';

export class CreateCartDto implements Partial<CartDto> {
  id?: string;
  products?: CartProductDto[];
  timestamp?: number;
}
