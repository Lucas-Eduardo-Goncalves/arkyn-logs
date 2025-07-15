import { ListWebhooksUseCase } from "../../../app/useCases/webhook/listWebhooksUseCase";
import { ListWebhooksController } from "../../../infra/controllers/webhook/listWebhooksController";
import { PrismaTrafficSourceRepository } from "../../../infra/data/repositories/trafficSource";
import { PrismaWebhookRepository } from "../../../infra/data/repositories/webhook";

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
