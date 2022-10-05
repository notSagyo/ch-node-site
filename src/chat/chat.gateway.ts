import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@WebSocketGateway()
export class ChatGateway {
  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('createChat')
  create(@MessageBody() createChatDto: CreateMessageDto) {
    //   return this.chatService.create(createChatDto);
    // }
    // @SubscribeMessage('findAllChat')
    // findAll() {
    //   return this.chatService.findAll();
    // }
    // @SubscribeMessage('findOneChat')
    // findOne(@MessageBody() id: number) {
    //   return this.chatService.findOne(id);
    // }
    // @SubscribeMessage('updateChat')
    // update(@MessageBody() updateChatDto: UpdateMessageDto) {
    //   return this.chatService.update(updateChatDto.id, updateChatDto);
    // }
    // @SubscribeMessage('removeChat')
    // remove(@MessageBody() id: number) {
    //   return this.chatService.remove(id);
  }
}
