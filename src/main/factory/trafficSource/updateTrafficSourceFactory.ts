import { PrismaTrafficSourceRepository } from "../../../infra/data/repositories/trafficSource";
import { UpdateTrafficSourceUseCase } from "../../../app/usecases/trafficSource/updateTrafficSourceUseCase";
import { UpdateTrafficSourceController } from "../../../infra/controllers/trafficSource/updateTrafficSourceController";

const prismaTrafficSourceRepository = new PrismaTrafficSourceRepository();

const updateTrafficSourceUseCase = new UpdateTrafficSourceUseCase(
  prismaTrafficSourceRepository
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
