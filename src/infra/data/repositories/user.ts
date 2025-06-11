import { User } from "../../../domain/entities/user";
import { UserRepository } from "../../../domain/repositories/user";
import { databaseConnection } from "../../adapters/dbAdapter";
import { UserMapper } from "../mappers/user";

class PrismaUserRepository implements UserRepository {
  async findAll(): Promise<User[]> {
    const users = await databaseConnection.user.findMany();
    return users.map(UserMapper.toEntity);
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

export { PrismaUserRepository };
