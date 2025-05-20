import { User } from "../../app/entities/user";

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
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }
}
export { UserMapper };
