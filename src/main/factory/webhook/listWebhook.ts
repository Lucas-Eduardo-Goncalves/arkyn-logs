import { ListWebhookUseCase } from "../../../app/useCases/webhook/listWebhookUseCase";
import { ListWebhookController } from "../../../infra/controllers/webhook/listWebhookController";
import { PrismaTrafficSourceRepository } from "../../../infra/data/repositories/trafficSource";
import { PrismaWebhookRepository } from "../../../infra/data/repositories/webhook";

const prismaWebhookRepository = new PrismaWebhookRepository();
const prismaTrafficSourceRepository = new PrismaTrafficSourceRepository();

const listWebhookUseCase = new ListWebhookUseCase(
  prismaWebhookRepository,
  prismaTrafficSourceRepository
);

const listWebhookController = new ListWebhookController(listWebhookUseCase);

const listWebhook = {
  handle: listWebhookController.handle.bind(listWebhookController),
};

export { listWebhook };
