import Container from '../../containers/container-mongo';
import { IDao } from '../../types/daos';
import { UserDto } from '../../types/dtos';
import { parseUser } from '../../utils/parsers';
import { usersModel } from './user-model';

export default class UsersDao implements IDao<UserDto> {
  static dao = new UsersDao();
  container = new Container(usersModel);

  constructor() {
    return UsersDao.dao;
  }

  async save(user: UserDto) {
    const parsedUser = parseUser(user);
    if (parsedUser != null) return await this.container.insert(parsedUser);
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

  async getAll(): Promise<UserDto[]> {
    return (await this.container.find('*')) || [];
  }

  async updateById(id: string, data: Partial<UserDto>) {
    return await this.container.update({ id }, data);
  }

  async deleteById(id: string) {
    return await this.container.delete({ id });
  }

  async deleteAll() {
    return await this.container.delete('*');
  }
}
