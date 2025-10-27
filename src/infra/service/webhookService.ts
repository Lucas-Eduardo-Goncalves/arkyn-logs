import { ApiService } from "@arkyn/server";
import { Webhook } from "../../domain/entities/webhook";
import { environmentVariables } from "../../main/config/environmentVariables";

type SendInput = {
  title: string;
  description: string;
};

const colorMap: Record<Webhook["level"], number> = {
  info: 0x0ea5e9,
  warning: 0xfb923c,
  fatal: 0xe11d48,
};

class WebhookService {
  private webhook: Webhook;

  constructor(webhook: Webhook) {
    this.webhook = webhook;
  }

  private async sendDiscordWebhook(input: SendInput) {
    const api = new ApiService({
      baseUrl: "https://discordapp.com",
      baseHeaders: {
        Authorization: `Bot ${environmentVariables.DISCORD_BOT_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    const embed = {
      title: input.title,
      description: input.description,
      color: colorMap[this.webhook.level],
      timestamp: new Date().toISOString(),
    };

    await api.post(`/api/channels/${this.webhook.value}/messages`, {
      body: { embeds: [embed] },
    });
  }

  async send(input: SendInput) {
    switch (this.webhook.type) {
      case "discord":
        await this.sendDiscordWebhook(input);
        break;
      default:
        throw new Error(`Unsupported webhook type: ${this.webhook.type}`);
    }
  }
}

export { WebhookService };
