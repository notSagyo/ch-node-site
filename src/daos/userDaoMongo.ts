import Container from '../containers/container-mongo';
import { parseUser, usersModel } from '../models/user';
import { iDao, iUser } from '../types';

export class UserDao implements iDao<iUser> {
  container = new Container(usersModel);

  async save(user: Partial<iUser>): Promise<boolean> {
    const parsedUser = parseUser(user);
    if (parsedUser != null)
      return await this.container.insert(parsedUser);
    return false;
  }

  async getById(id: string): Promise<iUser | null> {
    const res = await this.container.find({ id });
    const user = res ? res[0] : null;
    return user;
  }

  async getAll(): Promise<iUser[]> {
    return await this.container.find('*') || [];
  }

  async updateById(id: string, data: Partial<iUser>): Promise<boolean> {
    return await this.container.update({ id }, data);
  }

  async deleteById(id: string): Promise<boolean> {
    return await this.container.delete({ id });
  }

  async deleteAll(): Promise<boolean> {
    return await this.container.delete('*');
  }
}

export const usersDao = new UserDao();
