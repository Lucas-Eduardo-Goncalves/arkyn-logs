import { PrismaHttpTrafficRepository } from "../../../infra/data/repositories/httpTraffic";
import { ListHttpTrafficsUseCase } from "../../../app/usecases/httpTraffic/listHttpTrafficsUseCase";
import { ListHttpTrafficsController } from "../../../infra/controllers/httpTraffic/listHttpTrafficsController";

const prismaHttpTrafficRepository = new PrismaHttpTrafficRepository();
const listHttpTrafficsUseCase = new ListHttpTrafficsUseCase(
  prismaHttpTrafficRepository
);
const listHttpTrafficsController = new ListHttpTrafficsController(
  listHttpTrafficsUseCase
);

const listHttpTraffics = {
  handle: listHttpTrafficsController.handle.bind(listHttpTrafficsController),
};

export { listHttpTraffics };
