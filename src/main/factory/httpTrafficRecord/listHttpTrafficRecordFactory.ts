import { ListHttpTrafficRecordsUseCase } from "../../../app/usecases/httpTrafficRecord/listHttpTrafficRecordsUseCase";
import { ListHttpTrafficRecordsController } from "../../../infra/controllers/httpTrafficRecord/listHttpTrafficRecordsController";
import { PrismaHttpTrafficRecordDAL } from "../../../infra/dal/httpTrafficRecord";

const prismaHttpTrafficRecordDAL = new PrismaHttpTrafficRecordDAL();

const listHttpTrafficRecordsUseCase = new ListHttpTrafficRecordsUseCase(
  prismaHttpTrafficRecordDAL
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
