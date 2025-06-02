import { TrafficSourceRepository } from "../../../repositories/trafficSource";
import { UpdateTrafficSourceController } from "./updateTrafficSourceController";
import { UpdateTrafficSourceUseCase } from "./updateTrafficSourceUseCase";

const trafficSourceRepository = new TrafficSourceRepository();

const updateTrafficSourceUseCase = new UpdateTrafficSourceUseCase(
  trafficSourceRepository
);

const updateTrafficSourceController = new UpdateTrafficSourceController(
  updateTrafficSourceUseCase
);

const updateTrafficSource = {
  handle: updateTrafficSourceController.handle.bind(
    updateTrafficSourceController
  ),
};

export { updateTrafficSource };
