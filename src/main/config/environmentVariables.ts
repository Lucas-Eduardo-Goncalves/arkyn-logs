import { z } from "zod";

class EnvError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "EnvError";
  }
}

const environmentVariablesSchema = z.object({
  // JWT KEY
  JWT_KEY: z.string().min(1),

  // DATABASE URL
  DATABASE_URL: z.string().url(),
  DIRECT_URL: z.string().url(),

  // PORT
  PORT: z.string().min(4).regex(/^\d+$/).transform(Number),

  // DISCORD BOT TOKEN
  DISCORD_BOT_TOKEN: z.string().min(1),
});

function formatErrorMessage(error: z.ZodError) {
  const title = "Error validating env variables:";
  const lines = Object.entries(error.flatten().fieldErrors).map(
    ([key, value]) => `-> ${key}: ${value}`
  );
  return [title, ...lines].join("\n");
}

const parsedEnv = () => {
  try {
    return environmentVariablesSchema.parse(process.env);
  } catch (error: any) {
    throw new EnvError(formatErrorMessage(error));
  }
};

const environmentVariables = parsedEnv();

export { environmentVariables };
