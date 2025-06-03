import { TrafficSourceRepository } from "../../../repositories/trafficSource";
import { DeleteTrafficSourceController } from "./deleteTrafficSourceController";
import { DeleteTrafficSourceUseCase } from "./deleteTrafficSourceUseCase";

const trafficSourceRepository = new TrafficSourceRepository();

const deleteTrafficSourceUseCase = new DeleteTrafficSourceUseCase(
  trafficSourceRepository
);

const deleteTrafficSourceController = new DeleteTrafficSourceController(
  deleteTrafficSourceUseCase
);

const deleteTrafficSource = {
  handle: deleteTrafficSourceController.handle.bind(
    deleteTrafficSourceController
  ),
};

export { deleteTrafficSource };
