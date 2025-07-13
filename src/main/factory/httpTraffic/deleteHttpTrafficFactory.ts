import { DeleteHttpTrafficUseCase } from "../../../app/useCases/httpTraffic/deleteHttpTrafficUseCase";
import { DeleteHttpTrafficController } from "../../../infra/controllers/httpTraffic/deleteHttpTrafficController";
import { PrismaHttpTrafficRepository } from "../../../infra/data/repositories/httpTraffic";
import { PrismaTrafficSourceRepository } from "../../../infra/data/repositories/trafficSource";

const prismaHttpTrafficRepository = new PrismaHttpTrafficRepository();
const prismaTrafficSourceRepository = new PrismaTrafficSourceRepository();

const deleteHttpTrafficUseCase = new DeleteHttpTrafficUseCase(
  prismaHttpTrafficRepository,
  prismaTrafficSourceRepository
);

const deleteHttpTrafficController = new DeleteHttpTrafficController(
  deleteHttpTrafficUseCase
);

const deleteHttpTraffic = {
  handle: deleteHttpTrafficController.handle.bind(deleteHttpTrafficController),
};

export { deleteHttpTraffic };
