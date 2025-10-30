import { CreateResponseUseCase } from "../../../app/useCases/response/createResponseUseCase";
import { CreateResponseController } from "../../../infra/controllers/response/createResponseController";
import { PrismaResponseRepository } from "../../../infra/repositories/response";
import { FileStorageService } from "../../../infra/service/fileStorageService";

const prismaResponseRepository = new PrismaResponseRepository();
const fileStorage = new FileStorageService();

const createResponseUseCase = new CreateResponseUseCase(
  prismaResponseRepository,
  fileStorage
);

const createResponseController = new CreateResponseController(
  createResponseUseCase
);

const createResponse = {
  handle: createResponseController.handle.bind(createResponseController),
};

export { createResponse };
