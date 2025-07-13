import { FormatDateAdapter } from "../../infra/adapters/formatDateAdapter";
import { IdAdapter } from "../../infra/adapters/idAdapter";

type ConstructorProps = {
  id: string;
  discordChannelId: string | null;
  trafficSourceId: string;
  createdAt: Date;
  updatedAt: Date;
};

type CreateWebhookProps = {
  trafficSourceId: string;
};

type UpdateWebhookProps = {
  discordChannelId?: string;
};

type RestoreWebhookProps = ConstructorProps;

class Webhook {
  id: string;
  discordChannelId: string | null;
  trafficSourceId: string;
  createdAt: Date;
  updatedAt: Date;

  private constructor(props: ConstructorProps) {
    this.id = props.id;
    this.discordChannelId = props.discordChannelId;
    this.trafficSourceId = props.trafficSourceId;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static create(props: CreateWebhookProps) {
    return new Webhook({
      id: new IdAdapter().generate(),
      discordChannelId: process.env.DISCORD_WEBHOOK_URL || null,
      trafficSourceId: props.trafficSourceId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static restore(props: RestoreWebhookProps) {
    return new Webhook({
      id: props.id,
      discordChannelId: props.discordChannelId,
      trafficSourceId: props.trafficSourceId,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    });
  }

  updateWebhook(input: UpdateWebhookProps) {
    const { discordChannelId } = input;
    if (discordChannelId) this.discordChannelId = discordChannelId;
    this.updatedAt = new Date();
  }

  toJson() {
    const formatDateAdapter = new FormatDateAdapter();

    const createdAt = formatDateAdapter.format(this.createdAt);
    const updatedAt = formatDateAdapter.format(this.updatedAt);

    return {
      id: this.id,
      discordChannelId: this.discordChannelId,
      trafficSourceId: this.trafficSourceId,
      createdAt,
      updatedAt,
    };
  }
}

export { Webhook };
