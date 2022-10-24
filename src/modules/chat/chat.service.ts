import { MessageDto, MessageDtoPayload } from '../../types/dtos';
import { IChatService } from '../../types/services';
import Message, { parseMessage } from './message';
import MessageDao from './chat.dao';

class ChatService implements IChatService {
  async createMessage(messageDto: MessageDtoPayload): Promise<Message> {
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
    data: Partial<MessageDto>
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

const messageService = new ChatService();

export default messageService;
