import { ListHttpTrafficRecordsUseCase } from "../../../app/useCases/httpTrafficRecord/listHttpTrafficRecordsUseCase";
import { ListHttpTrafficRecordsController } from "../../../infra/controllers/httpTrafficRecord/listHttpTrafficRecordsController";
import { PrismaHttpTrafficRecordDAL } from "../../../infra/data/dal/httpTrafficRecord";
import { PrismaTrafficSourceRepository } from "../../../infra/data/repositories/trafficSource";

const prismaHttpTrafficRecordDAL = new PrismaHttpTrafficRecordDAL();
const prismaTrafficSourceRepository = new PrismaTrafficSourceRepository();

const listHttpTrafficRecordsUseCase = new ListHttpTrafficRecordsUseCase(
  prismaHttpTrafficRecordDAL,
  prismaTrafficSourceRepository
);

const listHttpTrafficRecordsController = new ListHttpTrafficRecordsController(
  listHttpTrafficRecordsUseCase
);

const listHttpTrafficRecords = {
  handle: listHttpTrafficRecordsController.handle.bind(
    listHttpTrafficRecordsController
  ),
};

export { listHttpTrafficRecords };
