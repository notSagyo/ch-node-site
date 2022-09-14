import { normalize } from 'normalizr';
import Container from '../../containers/container-mongo';
import { iDao } from '../../types/daos';
import { iMessage } from '../../types/models';
import { parseMessage } from '../../utils/parsers';
import UsersDao from '../user/users-dao-mongo';
import { messageModel, normalizerMessageSchema } from './message-model';

export default class MessagesDao implements iDao<iMessage> {
  static dao = new MessagesDao();
  container = new Container(messageModel);

  constructor() {
    return MessagesDao.dao;
  }

  async save(message?: Partial<iMessage>) {
    const parsedMessage = parseMessage(message);
    if (parsedMessage == null) return false;

    // If the user doesn't exist create it
    let foundUser = await UsersDao.dao.getByEmail(parsedMessage.author.email);
    if (foundUser == null) {
      await UsersDao.dao.save(parsedMessage.author);
      foundUser = await UsersDao.dao.getByEmail(parsedMessage.author.email);

      // Return false if still doesn't exist after trying to create it
      if (foundUser == null) return false;
    }

    const messageWithAuthor = { ...parsedMessage, author: foundUser };
    return await this.container.insert(messageWithAuthor);
  }

  async getById(id: string): Promise<iMessage | null> {
    const res = await this.container.find({ id });
    const message = res ? res[0] : null;
    return message;
  }

  async getAll() {
    return (await this.container.find('*')) || [];
  }

  async updateById(id: string, data: Partial<iMessage>) {
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
