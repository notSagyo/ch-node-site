import Container from '../../containers/container-mongo';
import { IDao } from '../../types/daos';
import { UserDto } from '../../types/dtos';
import User from './user';
import { usersModel } from './user.model';

export default class UserDao implements IDao<User> {
  static dao = new UserDao();
  container = new Container(usersModel);

  constructor() {
    return UserDao.dao;
  }

  async save(user: User) {
    const dto = user.toDto();
    return await this.container.insert(dto);
  }

  async getById(id: string): Promise<User | null> {
    const res = await this.container.find({ id });
    const product = res[0] ? User.fromDto(res[0]) : null;
    return product;
  }

  async getByEmail(email: string): Promise<User | null> {
    const res = await this.container.find({ email });
    const user = res[0] ? User.fromDto(res[0]) : null;
    return user;
  }

  async getAll(): Promise<User[]> {
    const usersDto = (await this.container.find('*')) || [];
    const users = usersDto.map((u) => User.fromDto(u));
    return users;
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
