import { databaseConnection } from "../../../infra/adapters/dbAdapter";
import { UserMapper } from "../../../infra/mappers/user";
import { User } from "../../entities/user";
import { UserRepositoryDTO } from "./repositoryDTO";

class UserRepository implements UserRepositoryDTO {
  async findAll(): Promise<User[]> {
    const users = await databaseConnection.user.findMany();
    return users.map((user) => UserMapper.toEntity(user));
  }

  async findById(userId: string): Promise<User | null> {
    const user = await databaseConnection.user.findUnique({
      where: { id: userId },
    });

    if (!user) return null;
    return UserMapper.toEntity(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await databaseConnection.user.findUnique({
      where: { email },
    });

    if (!user) return null;
    return UserMapper.toEntity(user);
  }

  async createUser(user: User): Promise<User> {
    await databaseConnection.user.create({ data: user });
    return user;
  }

  async updateUser(user: User): Promise<User> {
    await databaseConnection.user.update({
      data: user,
      where: { id: user.id },
    });

    return user;
  }

  async deleteUser(userId: string): Promise<void> {
    await databaseConnection.user.delete({
      where: { id: userId },
    });
  }
}

export { UserRepository };
