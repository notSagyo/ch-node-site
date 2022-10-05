import { Module } from '@nestjs/common';
import { AppControllerViews } from './app.controller';
import { AppService } from './app.service';
import { CartModule } from './cart/cart.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [CartModule, ProductModule, UserModule, ChatModule],
  controllers: [AppControllerViews],
  providers: [AppService],
})
export class AppModule {}
