import { PartialType } from '@nestjs/swagger';
import { CreateCartProductDto } from './create-cart-product.dto';

export class UpdateCartProductDto extends PartialType(CreateCartProductDto) {
  id: string;
  code?: string;
  quantity?: number;
  timestamp?: number;
}
