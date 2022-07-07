import { parseMessage } from '../chat/message';
import Container from '../containers/container-mongo';
import { messageModel } from '../models/message';
import { parseUser } from '../models/user';
import { iDao, iMessage } from '../types';
import { usersDao } from './userDaoMongo';

export default class MessagesDao implements iDao<iMessage> {
  container = new Container(messageModel);

  async save(message: Partial<iMessage>): Promise<boolean> {
    const pasedMessage = parseMessage(message);
    const parsedUser = parseUser(message?.author);

    if (parsedUser !== null)
      usersDao.save(parsedUser);
    if (pasedMessage != null)
      return await this.container.insert(pasedMessage);
    return false;
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
}

export const messagesDao = new MessagesDao();
