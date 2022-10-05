import { Test, TestingModule } from '@nestjs/testing';
import { AppControllerViews } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppControllerViews;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppControllerViews],
      providers: [AppService],
    }).compile();

    appController = app.get<AppControllerViews>(AppControllerViews);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHome()).toBe('Hello World!');
    });
  });
});
