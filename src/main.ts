// Initialize dotenv first, for any import that requires it
import dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import minimist from 'minimist';
import { AppModule } from './app.module';
import middlewares from './middlewares/middlewares';
import { initLogger } from './utils/logger';
import { viewsDirLocal } from './utils/paths';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import types from './types';

// Args
export const args = minimist(process.argv.slice(2));
export const mode = args.mode === 'cluster' ? 'CLUSTER' : 'FORK';
export const port = args.port || process.env.PORT || 8080;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Config
  app.setViewEngine('ejs');
  app.setBaseViewsDir(viewsDirLocal);
  initLogger();

  // Middlewares & Routes
  app.use(middlewares);

  const config = new DocumentBuilder()
    .setTitle('API Docs')
    .setDescription("All the API's endpoints")
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
}
bootstrap();
