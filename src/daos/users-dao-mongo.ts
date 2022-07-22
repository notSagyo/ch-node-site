import Container from '../containers/container-mongo';
import { parseUser } from '../utils/parsers';
import { usersModel } from '../models/user';
import { iUser } from '../types/models';
import { iDao } from '../types/daos';

export class UserDao implements iDao<iUser> {
  container = new Container(usersModel);

  async save(user: Partial<iUser>) {
    const parsedUser = parseUser(user);
    if (parsedUser != null)
      return await this.container.insert(parsedUser);
    return false;
  }

  async getById(id: string) {
    const res = await this.container.find({ id });
    const user = res ? res[0] : null;
    return user;
  }

  async getByEmail(email: string) {
    const res = await this.container.find({ email });
    const user = res ? res[0] : null;
    return user;
  }

  async getAll(): Promise<iUser[]> {
    return await this.container.find('*') || [];
  }

  async updateById(id: string, data: Partial<iUser>) {
    return await this.container.update({ id }, data);
  }

  async deleteById(id: string) {
    return await this.container.delete({ id });
  }

  async deleteAll() {
    return await this.container.delete('*');
  }
}

export const usersDao = new UserDao();
