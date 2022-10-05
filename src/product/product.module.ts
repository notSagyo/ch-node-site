import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import {
  ProductControllerViews,
  ProductsControllerApi,
} from './product.controller';

@Module({
  controllers: [ProductControllerViews, ProductsControllerApi],
  providers: [ProductService],
})
export class ProductModule {}
