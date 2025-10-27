import { User } from "../../../domain/entities/user";

type UserMapperDTO = {
  id: string;
  name: string;
  email: string;
  password: string;
  utc: number;
  createdAt: Date;
  updatedAt: Date;
};

class UserMapper {
  static toEntity(user: UserMapperDTO): User {
    return User.restore({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      utc: user.utc,
      createdAt: new Date(user.createdAt),
      updatedAt: new Date(user.updatedAt),
    });
  }
}
export { UserMapper };
