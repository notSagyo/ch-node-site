import { UserDto, UserDtoOptional } from '../../types/dtos';
import { IUserService } from '../../types/services';
import User, { parseUser } from './user';
import UserDao from './user.dao';

class UserService implements IUserService {
  async createUser(userDto: UserDtoOptional): Promise<User> {
    const user = User.fromDto(userDto);
    const success = await UserDao.dao.save(user);
    if (!success) throw new Error('User service: error saving userDto');
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return await UserDao.dao.getAll();
  }

  async getUserById(userId: string): Promise<User | null> {
    return await UserDao.dao.getById(userId);
  }

  async getUserByEmail(userEmail: string): Promise<User | null> {
    return await UserDao.dao.getByEmail(userEmail);
  }

  async deleteUserById(userId: string): Promise<boolean> {
    return await UserDao.dao.deleteById(userId);
  }

  async deleteAllUsers(): Promise<boolean> {
    return await UserDao.dao.deleteAll();
  }

  async updateUserById(
    userId: string,
    data: Partial<UserDto>
  ): Promise<boolean> {
    let success = false;

    const exists = (await this.getUserById(userId)) != null;
    if (exists) success = await UserDao.dao.updateById(userId, data);
    else {
      const parsedUser = parseUser(data);
      if (parsedUser)
        success = await UserDao.dao.save(User.fromDto(parsedUser));
    }

    return success;
  }
}

const userService = new UserService();

export default userService;
