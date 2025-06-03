import { TrafficSourceRepository } from "../../../repositories/trafficSource";
import { UserRepository } from "../../../repositories/user";
import { CreateTrafficSourceController } from "./createTrafficSourceController";
import { CreateTrafficSourceUseCase } from "./createTrafficSourceUseCase";

const trafficSourceRepository = new TrafficSourceRepository();
const userRepository = new UserRepository();

const createTrafficSourceUseCase = new CreateTrafficSourceUseCase(
  trafficSourceRepository,
  userRepository
);

const createTrafficSourceController = new CreateTrafficSourceController(
  createTrafficSourceUseCase
);

const createTrafficSource = {
  handle: createTrafficSourceController.handle.bind(
    createTrafficSourceController
  ),
};

export { createTrafficSource };
