import { ProductDto } from 'src/types/dtos';

export class CreateProductDto implements Partial<ProductDto> {
  name: string;
  price: number;
  id?: string;
  thumbnail?: string;
  description?: string;
}
