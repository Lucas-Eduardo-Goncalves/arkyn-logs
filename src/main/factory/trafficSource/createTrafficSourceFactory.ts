import { PrismaTrafficSourceRepository } from "../../../infra/repositories/trafficSource";
import { PrismaUserRepository } from "../../../infra/repositories/user";
import { CreateTrafficSourceUseCase } from "../../../app/usecases/trafficSource/createTrafficSourceUseCase";
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
