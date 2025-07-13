import { PrismaResponseRepository } from "../../../infra/data/repositories/response";
import { CreateResponseUseCase } from "../../../app/useCases/response/createResponseUseCase";
import { CreateResponseController } from "../../../infra/controllers/response/createResponseController";

const prismaResponseRepository = new PrismaResponseRepository();

const createResponseUseCase = new CreateResponseUseCase(
  prismaResponseRepository
);

const createResponseController = new CreateResponseController(
  createResponseUseCase
);

const createResponse = {
  handle: createResponseController.handle.bind(createResponseController),
};

export { createResponse };
