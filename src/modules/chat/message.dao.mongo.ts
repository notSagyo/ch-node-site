import { normalize } from 'normalizr';
import Container from '../../containers/container-mongo';
import { IDao } from '../../types/daos';
import { MessageDto } from '../../types/dtos';
import { parseMessage } from '../../utils/parsers';
import UserDao from '../user/user.dao';
import { messageModel, normalizerMessageSchema } from './message.model';

export default class MessageDao implements IDao<MessageDto> {
  static dao = new MessageDao();
  container = new Container(messageModel);

  constructor() {
    return MessageDao.dao;
  }

  async save(message?: Partial<MessageDto>) {
    const parsedMessage = parseMessage(message);
    if (parsedMessage == null) return false;

    // If the user doesn't exist create it
    let foundUser = await UserDao.dao.getByEmail(parsedMessage.author.email);
    if (foundUser == null) {
      await UserDao.dao.save(parsedMessage.author);
      foundUser = await UserDao.dao.getByEmail(parsedMessage.author.email);

      // Return false if still doesn't exist after trying to create it
      if (foundUser == null) return false;
    }

    const messageWithAuthor = { ...parsedMessage, author: foundUser };
    return await this.container.insert(messageWithAuthor);
  }

  async getById(id: string): Promise<MessageDto | null> {
    const res = await this.container.find({ id });
    const message = res ? res[0] : null;
    return message;
  }

  async getAll() {
    return (await this.container.find('*')) || [];
  }

  async updateById(id: string, data: Partial<MessageDto>) {
    return await this.container.update({ id }, data);
  }

  async deleteById(id: string) {
    return await this.container.delete({ id });
  }

  async deleteAll() {
    return await this.container.delete('*');
  }

  async getAllNormalized() {
    const messages = await this.getAll();
    const normalizedMessages = normalize(messages, [normalizerMessageSchema]);
    return normalizedMessages;
  }
}
