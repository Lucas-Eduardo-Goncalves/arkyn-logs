import { PrismaTrafficSourceRepository } from "../../../infra/repositories/trafficSource";
import { DeleteTrafficSourceUseCase } from "../../../app/usecases/trafficSource/deleteTrafficSourceUseCase";
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
