import { Client, GatewayIntentBits } from "discord.js";
import { environmentVariables } from "../../main/config/environmentVariables";
import { name, version } from "../../../package.json";

class DiscordAdapter {
  private static instance: DiscordAdapter;
  private _client: Client;

  private constructor() {
    this._client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
    });

    this.setupEventListeners();
    this._client.login(environmentVariables.DISCORD_BOT_TOKEN);
  }

  public static getInstance(): DiscordAdapter {
    if (!DiscordAdapter.instance) {
      DiscordAdapter.instance = new DiscordAdapter();
    }
    return DiscordAdapter.instance;
  }

  public get client(): Client {
    return this._client;
  }

  private setupEventListeners(): void {
    this._client.once("ready", () => console.log(`Discord bot logged.`));

    this._client.on("messageCreate", async (message) => {
      if (message.author.bot) return;

      const embed = {
        title: name,
        description: `Running version **${version}**`,
        color: 0x0ea5e9,
        timestamp: new Date().toISOString(),
      };

      if (message.content === "!status") {
        await message.channel.send({ embeds: [embed] });
      }
    });
  }
}

export { DiscordAdapter };
