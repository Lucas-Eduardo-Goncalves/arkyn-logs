import { FormatDateAdapter } from "../../infra/adapters/formatDateAdapter";
import { IdAdapter } from "../../infra/adapters/idAdapter";

type ConstructorProps = {
  id: string;
  name: string;
  email: string;
  password: string;
  utc: number;
  createdAt: Date;
  updatedAt: Date;
};

type CreateUserProps = {
  name: string;
  email: string;
  password: string;
  utc: number;
};

type UpdateUserProps = {
  name?: string;
  utc?: number;
};

type RestoreUserProps = ConstructorProps;

class User {
  id: string;
  name: string;
  email: string;
  password: string;
  utc: number;
  createdAt: Date;
  updatedAt: Date;

  private constructor(props: ConstructorProps) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
    this.utc = props.utc;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static create(props: CreateUserProps) {
    return new User({
      id: IdAdapter.generate(),
      name: props.name,
      email: props.email,
      password: props.password,
      utc: props.utc,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static restore(props: RestoreUserProps) {
    return new User({
      id: props.id,
      name: props.name,
      email: props.email,
      password: props.password,
      utc: props.utc,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    });
  }

  update(props: UpdateUserProps) {
    const { name, utc } = props;
    if (name) this.name = name;
    if (utc) this.utc = utc;
    this.updatedAt = new Date();
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      utc: this.utc,
      createdAt: FormatDateAdapter.format(this.createdAt),
      updatedAt: FormatDateAdapter.format(this.updatedAt),
    };
  }
}

export { User };
