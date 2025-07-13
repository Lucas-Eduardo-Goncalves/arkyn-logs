import { ApiInstance } from "@arkyn/server";
import { Webhook } from "../../domain/entities/webhook";
import { environmentVariables } from "../../main/config/environmentVariables";

type SendInput = {
  title: string;
  description: string;
  type: "INFO" | "WARNING" | "FATAL";
};

const colorMap: Record<SendInput["type"], number> = {
  INFO: 0x0ea5e9,
  WARNING: 0xfb923c,
  FATAL: 0xe11d48,
};

class WebhookService {
  private webhook: Webhook;

  constructor(webhook: Webhook) {
    this.webhook = webhook;
  }

  private async sendDiscordWebhook(input: SendInput) {
    const api = new ApiInstance({
      baseUrl: "https://discordapp.com",
      baseHeaders: {
        Authorization: `Bot ${environmentVariables.DISCORD_BOT_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    const embed = {
      title: input.title,
      description: input.description,
      color: colorMap[input.type],
      timestamp: new Date().toISOString(),
    };

    await api.POST(`/api/channels/${this.webhook.discordChannelId}/messages`, {
      body: { embeds: [embed] },
    });
  }

  async send(input: SendInput) {
    if (this.webhook.discordChannelId) await this.sendDiscordWebhook(input);
  }
}

export { WebhookService };
