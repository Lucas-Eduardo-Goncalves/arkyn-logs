import { PrismaTrafficSourceRepository } from "../../../infra/repositories/trafficSource";
import { UpdateTrafficSourceUseCase } from "../../../app/useCases/trafficSource/updateTrafficSourceUseCase";
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
