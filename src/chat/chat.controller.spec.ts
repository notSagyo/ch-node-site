import { Test, TestingModule } from '@nestjs/testing';
import { ChatControllerViews } from './chat.controller';

describe('ChatController', () => {
  let controller: ChatControllerViews;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatControllerViews],
    }).compile();

    controller = module.get<ChatControllerViews>(ChatControllerViews);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
