import { FormatDateAdapter } from "../../infra/adapters/formatDateAdapter";
import { IdAdapter } from "../../infra/adapters/idAdapter";

type ConstructorProps = {
  id: string;
  hash: string;
  message: string;
  metadata: string;
  firstSeenAt: Date;
  lastSeenAt: Date;
  logChannelId: string;
  createdAt: Date;
  updatedAt: Date;
};

type CreateLogErrorProps = {
  hash: string;
  message: string;
  metadata: string;
  logChannelId: string;
};

type RestoreLogErrorProps = ConstructorProps;

class LogError {
  id: string;
  hash: string;
  message: string;
  metadata: string;
  firstSeenAt: Date;
  lastSeenAt: Date;
  logChannelId: string;
  createdAt: Date;
  updatedAt: Date;

  private constructor(props: ConstructorProps) {
    this.id = props.id;
    this.hash = props.hash;
    this.message = props.message;
    this.metadata = props.metadata;
    this.firstSeenAt = props.firstSeenAt;
    this.lastSeenAt = props.lastSeenAt;
    this.logChannelId = props.logChannelId;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static create(props: CreateLogErrorProps) {
    const idAdapter = new IdAdapter();
    return new LogError({
      id: idAdapter.generate(),
      hash: props.hash,
      message: props.message,
      metadata: props.metadata,
      firstSeenAt: new Date(),
      lastSeenAt: new Date(),
      logChannelId: props.logChannelId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  update() {
    this.lastSeenAt = new Date();
    this.updatedAt = new Date();
  }

  static restore(props: RestoreLogErrorProps) {
    return new LogError({
      id: props.id,
      hash: props.hash,
      message: props.message,
      metadata: props.metadata,
      firstSeenAt: props.firstSeenAt,
      lastSeenAt: props.lastSeenAt,
      logChannelId: props.logChannelId,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    });
  }

  toJson() {
    const formatDateAdapter = new FormatDateAdapter();
    const firstSeenAt = formatDateAdapter.format(this.firstSeenAt);
    const lastSeenAt = formatDateAdapter.format(this.lastSeenAt);
    const createdAt = formatDateAdapter.format(this.createdAt);
    const updatedAt = formatDateAdapter.format(this.updatedAt);

    return {
      id: this.id,
      hash: this.hash,
      message: this.message,
      metadata: this.metadata,
      firstSeenAt: firstSeenAt,
      lastSeenAt: lastSeenAt,
      createdAt: createdAt,
      updatedAt: updatedAt,
    };
  }
}

export { LogError };
