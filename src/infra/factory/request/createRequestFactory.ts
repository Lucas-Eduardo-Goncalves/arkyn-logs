import { PrismaHttpTrafficRepository } from "../../../app/repositories/httpTraffic";
import { PrismaRequestRepository } from "../../../app/repositories/request";
import { CreateRequestUseCase } from "../../../app/usecases/request/createRequestUseCase";
import { CreateRequestController } from "../../controllers/request/createRequestController";

const prismaRequestRepository = new PrismaRequestRepository();
const prismaHttpTrafficRepository = new PrismaHttpTrafficRepository();

const createRequestUseCase = new CreateRequestUseCase(
  prismaRequestRepository,
  prismaHttpTrafficRepository
);

const createRequestController = new CreateRequestController(
  createRequestUseCase
);

const createRequest = {
  handle: createRequestController.handle.bind(createRequestController),
};

export { createRequest };
