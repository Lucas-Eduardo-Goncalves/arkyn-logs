import { FormatDateAdapter } from "../../infra/adapters/formatDateAdapter";
import { IdAdapter } from "../../infra/adapters/idAdapter";

type ConstructorProps = {
  id: string;
  level: "fatal" | "warning" | "info";
  type: "discord";
  value: string;
  trafficSourceId: string;
  createdAt: Date;
  updatedAt: Date;
};

type CreateWebhookProps = {
  value: string;
  level: "fatal" | "warning" | "info";
  type: "discord";
  trafficSourceId: string;
};

type UpdateWebhookProps = {
  value: string;
};

type RestoreWebhookProps = ConstructorProps;

class Webhook {
  id: string;
  level: "fatal" | "warning" | "info";
  type: "discord";
  value: string;
  trafficSourceId: string;
  createdAt: Date;
  updatedAt: Date;

  private constructor(props: ConstructorProps) {
    this.id = props.id;
    this.level = props.level;
    this.value = props.value;
    this.type = props.type;
    this.trafficSourceId = props.trafficSourceId;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static create(props: CreateWebhookProps) {
    return new Webhook({
      id: new IdAdapter().generate(),
      level: props.level,
      value: props.value,
      type: props.type,
      trafficSourceId: props.trafficSourceId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static restore(props: RestoreWebhookProps) {
    return new Webhook({
      id: props.id,
      level: props.level,
      value: props.value,
      type: props.type,
      trafficSourceId: props.trafficSourceId,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    });
  }

  updateWebhook(input: UpdateWebhookProps) {
    const { value } = input;
    if (value) this.value = value;
    this.updatedAt = new Date();
  }

  toJson() {
    const formatDateAdapter = new FormatDateAdapter();

    const createdAt = formatDateAdapter.format(this.createdAt);
    const updatedAt = formatDateAdapter.format(this.updatedAt);

    return {
      id: this.id,
      value: this.value,
      level: this.level,
      type: this.type,
      trafficSourceId: this.trafficSourceId,
      createdAt,
      updatedAt,
    };
  }
}

export { Webhook };
