import { IdAdapter } from "../../infra/adapters/idAdapter";

type ConstructorProps = {
  id: string;
  name: string;
  mail: string;
  password: string;
  utc: number;
  createdAt: Date;
  updatedAt: Date;
};

type CreateUserProps = {
  name: string;
  mail: string;
  password: string;
  utc: number;
};

type UpdateUserProps = {
  name?: string;
  mail?: string;
};

type RestoreUserProps = ConstructorProps;

class User {
  id: string;
  name: string;
  mail: string;
  password: string;
  utc: number;
  createdAt: Date;
  updatedAt: Date;

  private constructor(props: ConstructorProps) {
    this.id = props.id;
    this.name = props.name;
    this.mail = props.mail;
    this.password = props.password;
    this.utc = props.utc;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static create(props: CreateUserProps) {
    const idAdapter = new IdAdapter();
    return new User({
      id: idAdapter.generate(),
      name: props.name,
      mail: props.mail,
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
      mail: props.mail,
      password: props.password,
      utc: props.utc,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    });
  }

  update(props: UpdateUserProps) {
    this.name = props.name ?? this.name;
    this.mail = props.mail ?? this.mail;
    this.updatedAt = new Date();
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
      mail: this.mail,
      utc: this.utc,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

export { User };
