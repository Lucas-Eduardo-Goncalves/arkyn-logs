import { ListWebhooksUseCase } from "../../../app/useCases/webhook/listWebhooksUseCase";
import { ListWebhooksController } from "../../../infra/controllers/webhook/listWebhooksController";
import { PrismaTrafficSourceRepository } from "../../../infra/repositories/trafficSource";
import { PrismaWebhookRepository } from "../../../infra/repositories/webhook";

const prismaWebhookRepository = new PrismaWebhookRepository();
const prismaTrafficSourceRepository = new PrismaTrafficSourceRepository();

const listWebhooksUseCase = new ListWebhooksUseCase(
  prismaWebhookRepository,
  prismaTrafficSourceRepository
);

const listWebhooksController = new ListWebhooksController(listWebhooksUseCase);

const listWebhooks = {
  handle: listWebhooksController.handle.bind(listWebhooksController),
};

export { listWebhooks };
