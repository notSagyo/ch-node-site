import { Test, TestingModule } from '@nestjs/testing';
import { UserControllerApi } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserControllerApi;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserControllerApi],
      providers: [UserService],
    }).compile();

    controller = module.get<UserControllerApi>(UserControllerApi);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
