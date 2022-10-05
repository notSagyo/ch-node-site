import { Test, TestingModule } from '@nestjs/testing';
import { CartControllerApi } from './cart.controller';
import { CartService } from './cart.service';

describe('CartController', () => {
  let controller: CartControllerApi;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartControllerApi],
      providers: [CartService],
    }).compile();

    controller = module.get<CartControllerApi>(CartControllerApi);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
