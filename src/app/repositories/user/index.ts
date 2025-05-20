import { HttpAdapter } from "../../../infra/adapters/httpAdapter";
import { User } from "../../entities/user";
import { UserRepositoryDTO } from "./repositoryDTO";

class UserRepository implements UserRepositoryDTO {
  static users: User[] = [];

  async findAll(): Promise<User[]> {
    return UserRepository.users;
  }

  async findById(userId: string): Promise<User | null> {
    const user = UserRepository.users.find((user) => user.id === userId);
    return user || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = UserRepository.users.find((user) => user.email === email);
    return user || null;
  }

  async createUser(user: User): Promise<User> {
    UserRepository.users.push(user);
    return user;
  }

  async updateUser(user: User): Promise<User> {
    const index = UserRepository.users.findIndex((u) => u.id === user.id);
    const httpAdpter = new HttpAdapter();
    if (index === -1) httpAdpter.serverError("User not found");
    UserRepository.users[index] = user;
    return user;
  }

  async deleteUser(userId: string): Promise<void> {
    const index = UserRepository.users.findIndex((user) => user.id === userId);
    const httpAdpter = new HttpAdapter();
    if (index === -1) httpAdpter.serverError("User not found");
    UserRepository.users.splice(index, 1);
  }
}

export { UserRepository };
