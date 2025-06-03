import { HttpTrafficRepository } from "../../../repositories/httpTraffic";
import { ListSummaryHttpTrafficsController } from "./listSummaryHttpTrafficsController";
import { ListSummaryHttpTrafficsUseCase } from "./listSummaryHttpTrafficsUseCase";

const httpTrafficRepository = new HttpTrafficRepository();
const listSummaryHttpTrafficsUseCase = new ListSummaryHttpTrafficsUseCase(
  httpTrafficRepository
);
const listSummaryHttpTrafficsController = new ListSummaryHttpTrafficsController(
  listSummaryHttpTrafficsUseCase
);

const listSummaryHttpTraffics = {
  handle: listSummaryHttpTrafficsController.handle.bind(
    listSummaryHttpTrafficsController
  ),
};

export { listSummaryHttpTraffics };
