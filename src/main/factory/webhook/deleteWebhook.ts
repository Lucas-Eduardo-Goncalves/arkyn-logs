import { DeleteWebhookUseCase } from "../../../app/useCases/webhook/deleteWebhookUseCase";
import { DeleteWebhookController } from "../../../infra/controllers/webhook/deleteWebhookController";
import { PrismaTrafficSourceRepository } from "../../../infra/data/repositories/trafficSource";
import { PrismaWebhookRepository } from "../../../infra/data/repositories/webhook";

const prismaWebhookRepository = new PrismaWebhookRepository();
const prismaTrafficSourceRepository = new PrismaTrafficSourceRepository();

const deleteWebhookUseCase = new DeleteWebhookUseCase(
  prismaWebhookRepository,
  prismaTrafficSourceRepository
);

const deleteWebhookController = new DeleteWebhookController(
  deleteWebhookUseCase
);

const deleteWebhook = {
  handle: deleteWebhookController.handle.bind(deleteWebhookController),
};

export { deleteWebhook };
