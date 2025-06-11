import { PrismaHttpTrafficRepository } from "../../../infra/repositories/httpTraffic";
import { DeleteHttpTrafficUseCase } from "../../../app/usecases/httpTraffic/deleteHttpTrafficUseCase";
import { DeleteHttpTrafficController } from "../../../infra/controllers/httpTraffic/deleteHttpTrafficController";

const prismaHttpTrafficRepository = new PrismaHttpTrafficRepository();

const deleteHttpTrafficUseCase = new DeleteHttpTrafficUseCase(
  prismaHttpTrafficRepository
);

const deleteHttpTrafficController = new DeleteHttpTrafficController(
  deleteHttpTrafficUseCase
);

const deleteHttpTraffic = {
  handle: deleteHttpTrafficController.handle.bind(deleteHttpTrafficController),
};

export { deleteHttpTraffic };
