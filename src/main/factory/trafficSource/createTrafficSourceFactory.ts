import { CreateTrafficSourceUseCase } from "../../../app/useCases/trafficSource/createTrafficSourceUseCase";
import { CreateTrafficSourceController } from "../../../infra/controllers/trafficSource/createTrafficSourceController";
import { PrismaTrafficSourceRepository } from "../../../infra/data/repositories/trafficSource";
import { PrismaUserRepository } from "../../../infra/data/repositories/user";
import { PrismaWebhookRepository } from "../../../infra/data/repositories/webhook";

const prismaTrafficSourceRepository = new PrismaTrafficSourceRepository();
const prismaUserRepository = new PrismaUserRepository();
const prismaWebhookRepository = new PrismaWebhookRepository();

const createTrafficSourceUseCase = new CreateTrafficSourceUseCase(
  prismaTrafficSourceRepository,
  prismaUserRepository,
  prismaWebhookRepository
);

const createTrafficSourceController = new CreateTrafficSourceController(
  createTrafficSourceUseCase
);

const createTrafficSource = {
  handle: createTrafficSourceController.handle.bind(
    createTrafficSourceController
  ),
};

export { createTrafficSource };
