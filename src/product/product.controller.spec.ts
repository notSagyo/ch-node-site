import { Test, TestingModule } from '@nestjs/testing';
import { ProductsControllerApi } from './product.controller';
import { ProductService } from './product.service';

describe('ProductController', () => {
  let controller: ProductsControllerApi;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsControllerApi],
      providers: [ProductService],
    }).compile();

    controller = module.get<ProductsControllerApi>(ProductsControllerApi);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
