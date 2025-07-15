import { CreateWebhookUseCase } from "../../../app/useCases/webhook/createWebhookUseCase";
import { CreateWebhookController } from "../../../infra/controllers/webhook/createWebhookController";
import { PrismaTrafficSourceRepository } from "../../../infra/data/repositories/trafficSource";
import { PrismaWebhookRepository } from "../../../infra/data/repositories/webhook";

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
