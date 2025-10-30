import { CreateWebhookUseCase } from "../../../app/useCases/webhook/createWebhookUseCase";
import { CreateWebhookController } from "../../../infra/controllers/webhook/createWebhookController";
import { PrismaTrafficSourceRepository } from "../../../infra/repositories/trafficSource";
import { PrismaWebhookRepository } from "../../../infra/repositories/webhook";

const prismaWebhookRepository = new PrismaWebhookRepository();
const prismaTrafficSourceRepository = new PrismaTrafficSourceRepository();

const createWebhookUseCase = new CreateWebhookUseCase(
  prismaWebhookRepository,
  prismaTrafficSourceRepository
);

const createWebhookController = new CreateWebhookController(
  createWebhookUseCase
);

const createWebhook = {
  handle: createWebhookController.handle.bind(createWebhookController),
};

export { createWebhook };
