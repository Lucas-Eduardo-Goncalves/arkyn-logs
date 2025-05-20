import { User } from "../../entities/user";

type UserRepositoryDTO = {
  findAll: () => Promise<User[]>;
  findById: (userId: string) => Promise<User | null>;
  findByEmail: (email: string) => Promise<User | null>;
  createUser: (User: User) => Promise<User>;
  updateUser: (User: User) => Promise<User>;
  deleteUser: (userId: string) => Promise<void>;
};

export type { UserRepositoryDTO };
