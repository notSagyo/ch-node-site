import { PartialType } from '@nestjs/swagger';
import CartProduct from '../entities/cart-product.entity';
import { CreateCartDto } from './create-cart.dto';

export class UpdateCartDto extends PartialType(CreateCartDto) {
  id: string;
  products?: CartProduct[];
  timestamp?: number;
}
