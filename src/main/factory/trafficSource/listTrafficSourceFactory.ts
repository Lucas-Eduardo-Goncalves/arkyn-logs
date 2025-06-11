import { PrismaTrafficSourceRepository } from "../../../infra/data/repositories/trafficSource";
import { ListTrafficSourcesUseCase } from "../../../app/usecases/trafficSource/listTrafficSourcesUseCase";
import { ListTrafficSourcesController } from "../../../infra/controllers/trafficSource/listTrafficSourcesController";

const prismaTrafficSourceRepository = new PrismaTrafficSourceRepository();

const listTrafficSourcesUseCase = new ListTrafficSourcesUseCase(
  prismaTrafficSourceRepository
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
