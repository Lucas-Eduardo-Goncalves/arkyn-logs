import { PrismaTrafficSourceRepository } from "../../../infra/data/repositories/trafficSource";
import { PrismaUserRepository } from "../../../infra/data/repositories/user";
import { CreateTrafficSourceUseCase } from "../../../app/useCases/trafficSource/createTrafficSourceUseCase";
import { CreateTrafficSourceController } from "../../../infra/controllers/trafficSource/createTrafficSourceController";

const prismaTrafficSourceRepository = new PrismaTrafficSourceRepository();
const prismaUserRepository = new PrismaUserRepository();

const createTrafficSourceUseCase = new CreateTrafficSourceUseCase(
  prismaTrafficSourceRepository,
  prismaUserRepository
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
