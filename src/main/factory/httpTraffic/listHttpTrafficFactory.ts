import { PrismaHttpTrafficRepository } from "../../../infra/data/repositories/httpTraffic";
import { ListHttpTrafficsUseCase } from "../../../app/useCases/httpTraffic/listHttpTrafficsUseCase";
import { ListHttpTrafficsController } from "../../../infra/controllers/httpTraffic/listHttpTrafficsController";
import { PrismaTrafficSourceRepository } from "../../../infra/data/repositories/trafficSource";

const prismaHttpTrafficRepository = new PrismaHttpTrafficRepository();
const prismaTrafficSourceRepository = new PrismaTrafficSourceRepository();

const listHttpTrafficsUseCase = new ListHttpTrafficsUseCase(
  prismaHttpTrafficRepository,
  prismaTrafficSourceRepository
);

const listHttpTrafficsController = new ListHttpTrafficsController(
  listHttpTrafficsUseCase
);

const listHttpTraffics = {
  handle: listHttpTrafficsController.handle.bind(listHttpTrafficsController),
};

export { listHttpTraffics };
