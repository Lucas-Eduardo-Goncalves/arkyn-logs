import { HttpTrafficRepository } from "../../../repositories/httpTraffic";
import { ListHttpTrafficsController } from "./listHttpTrafficsController";
import { ListHttpTrafficsUseCase } from "./listHttpTrafficsUseCase";

const httpTrafficRepository = new HttpTrafficRepository();
const listHttpTrafficsUseCase = new ListHttpTrafficsUseCase(
  httpTrafficRepository
);
const listHttpTrafficsController = new ListHttpTrafficsController(
  listHttpTrafficsUseCase
);

const listHttpTraffics = {
  handle: listHttpTrafficsController.handle.bind(listHttpTrafficsController),
};

export { listHttpTraffics };
