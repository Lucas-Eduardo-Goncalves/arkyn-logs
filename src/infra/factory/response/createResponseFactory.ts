import { PrismaHttpTrafficRepository } from "../../../app/repositories/httpTraffic";
import { PrismaResponseRepository } from "../../../app/repositories/response";
import { CreateResponseUseCase } from "../../../app/usecases/response/createResponseUseCase";
import { CreateResponseController } from "../../controllers/response/createResponseController";

const prismaResponseRepository = new PrismaResponseRepository();
const prismaHttpTrafficRepository = new PrismaHttpTrafficRepository();

const createResponseUseCase = new CreateResponseUseCase(
  prismaResponseRepository,
  prismaHttpTrafficRepository
);

const createResponseController = new CreateResponseController(
  createResponseUseCase
);

const createResponse = {
  handle: createResponseController.handle.bind(createResponseController),
};

export { createResponse };
