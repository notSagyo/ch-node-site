import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { ChatControllerViews } from './chat.controller';

@Module({
  providers: [ChatGateway, ChatService],
  controllers: [ChatControllerViews],
})
export class ChatModule {}
