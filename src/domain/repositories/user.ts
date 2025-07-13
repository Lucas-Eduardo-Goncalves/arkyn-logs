import { UserSearchParams } from "../../app/search/userSearchParams";
import { SearchResult } from "../../app/shared/searchResult";
import { User } from "../entities/user";

type UserRepository = {
  findAll: (searchParams: UserSearchParams) => Promise<SearchResult<User>>;
  findById: (userId: string) => Promise<User | null>;
  findByEmail: (email: string) => Promise<User | null>;
  createUser: (User: User) => Promise<User>;
  updateUser: (User: User) => Promise<User>;
  deleteUser: (userId: string) => Promise<void>;
};

export type { UserRepository };
