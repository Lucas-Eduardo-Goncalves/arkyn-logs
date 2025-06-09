import { PrismaResponseRepository } from "../../../app/repositories/response";
import { CreateResponseUseCase } from "../../../app/usecases/response/createResponseUseCase";
import { CreateResponseController } from "../../controllers/response/createResponseController";

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
