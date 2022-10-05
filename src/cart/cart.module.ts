import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartControllerViews, CartControllerApi } from './cart.controller';

@Module({
  controllers: [CartControllerViews, CartControllerApi],
  providers: [CartService],
})
export class CartModule {}
