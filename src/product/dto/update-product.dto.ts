import { PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  id: string;
  name?: string;
  price?: number;
  thumbnail?: string;
  description?: string;
}
