import { PrismaRequestRepository } from "../../../infra/data/repositories/request";
import { CreateRequestUseCase } from "../../../app/usecases/request/createRequestUseCase";
import { CreateRequestController } from "../../../infra/controllers/request/createRequestController";

const prismaRequestRepository = new PrismaRequestRepository();

const createRequestUseCase = new CreateRequestUseCase(prismaRequestRepository);

const createRequestController = new CreateRequestController(
  createRequestUseCase
);

const createRequest = {
  handle: createRequestController.handle.bind(createRequestController),
};

export { createRequest };
