import * as normalizr from 'normalizr';
import { messageModel, normalizrMessage } from '../models/message';
import Container from '../containers/container-mongo';
import { parseMessage } from '../utils/parsers';
import { iDao, iMessage } from '../types';
import { usersDao } from './users-dao-mongo';

export default class MessagesDao implements iDao<iMessage> {
  container = new Container(messageModel);

  async save(message: Partial<iMessage>): Promise<boolean> {
    const parsedMessage = parseMessage(message);
    if (parsedMessage == null)
      return false;

    // If the user doesn't exist create it
    let foundUser = await usersDao.getByEmail(parsedMessage.author.email);
    if (foundUser == null) {
      await usersDao.save(parsedMessage.author);
      foundUser = await usersDao.getByEmail(parsedMessage.author.email);

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

  async getAll(): Promise<iMessage[]> {
    return await this.container.find('*') || [];
  }

  async updateById(id: string, data: Partial<iMessage>): Promise<boolean> {
    return await this.container.update({ id }, data);
  }

  async deleteById(id: string): Promise<boolean> {
    return await this.container.delete({ id });
  }

  async deleteAll(): Promise<boolean> {
    return await this.container.delete('*');
  }

  async getAllNormalized() {
    const messages = await this.getAll();
    const normalizedMessages = normalizr.normalize(messages, [normalizrMessage]);
    return normalizedMessages;
  }
}

export const messagesDao = new MessagesDao();
