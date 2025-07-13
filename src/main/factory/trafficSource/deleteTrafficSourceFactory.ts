import { PrismaTrafficSourceRepository } from "../../../infra/data/repositories/trafficSource";
import { DeleteTrafficSourceUseCase } from "../../../app/useCases/trafficSource/deleteTrafficSourceUseCase";
import { DeleteTrafficSourceController } from "../../../infra/controllers/trafficSource/deleteTrafficSourceController";

const prismaTrafficSourceRepository = new PrismaTrafficSourceRepository();

const deleteTrafficSourceUseCase = new DeleteTrafficSourceUseCase(
  prismaTrafficSourceRepository
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
