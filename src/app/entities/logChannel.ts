import { IdAdapter } from "../../infra/adapters/idAdapter";

type ConstructorProps = {
  id: string;
  name: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

type CreateLogChannelProps = {
  name: string;
  userId: string;
};

type UpdateLogChannelProps = {
  name?: string;
};

type RestoreLogChannelProps = ConstructorProps;

class LogChannel {
  id: string;
  name: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;

  private constructor(props: ConstructorProps) {
    this.id = props.id;
    this.name = props.name;
    this.userId = props.userId;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static create(props: CreateLogChannelProps) {
    const idAdapter = new IdAdapter();
    return new LogChannel({
      id: idAdapter.generate(),
      name: props.name,
      userId: props.userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static restore(props: RestoreLogChannelProps) {
    return new LogChannel({
      id: props.id,
      name: props.name,
      userId: props.userId,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    });
  }

  update(props: UpdateLogChannelProps) {
    this.name = props.name ?? this.name;
    this.updatedAt = new Date();
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
      userId: this.userId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

export { LogChannel };
