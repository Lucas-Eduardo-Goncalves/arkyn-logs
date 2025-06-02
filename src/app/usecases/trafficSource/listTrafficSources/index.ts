import { TrafficSourceRepository } from "../../../repositories/trafficSource";
import { ListTrafficSourcesController } from "./listTrafficSourcesController";
import { ListTrafficSourcesUseCase } from "./listTrafficSourcesUseCase";

const trafficSourceRepository = new TrafficSourceRepository();
const listTrafficSourcesUseCase = new ListTrafficSourcesUseCase(
  trafficSourceRepository
);
const listTrafficSourcesController = new ListTrafficSourcesController(
  listTrafficSourcesUseCase
);

const listTrafficSources = {
  handle: listTrafficSourcesController.handle.bind(
    listTrafficSourcesController
  ),
};

export { listTrafficSources };
