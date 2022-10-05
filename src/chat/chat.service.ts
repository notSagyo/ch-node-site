import { Injectable } from '@nestjs/common';
import MessageDao from './dao/chat.dao';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import Message, { parseMessage } from './entities/message.entity';

@Injectable()
export class ChatService {
  async createMessage(messageDto: CreateMessageDto): Promise<Message> {
    const cart = Message.fromDto(messageDto);
    const success = await MessageDao.dao.save(cart);
    if (!success) throw new Error('Message service: error saving messageDto');
    return cart;
  }

  async getAllMessages(): Promise<Message[]> {
    return await MessageDao.dao.getAll();
  }
  async getMessageById(messageId: string): Promise<Message | null> {
    return await MessageDao.dao.getById(messageId);
  }

  async deleteMessageById(messageId: string): Promise<boolean> {
    return await MessageDao.dao.deleteById(messageId);
  }

  async deleteAllMessages(): Promise<boolean> {
    return await MessageDao.dao.deleteAll();
  }

  async updateMessageById(
    messageId: string,
    data: Partial<UpdateMessageDto>,
  ): Promise<boolean> {
    let success = false;

    const exists = (await this.getMessageById(messageId)) != null;
    if (exists) success = await MessageDao.dao.updateById(messageId, data);
    else {
      const parsedMessage = parseMessage(data);
      if (parsedMessage)
        success = await MessageDao.dao.save(Message.fromDto(parsedMessage));
    }

    return success;
  }
}
