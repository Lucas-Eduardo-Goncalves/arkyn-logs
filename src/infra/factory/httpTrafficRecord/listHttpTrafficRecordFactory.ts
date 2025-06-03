import { PrismaHttpTrafficRecordDAL } from "../../../app/dal/httpTrafficRecord";
import { ListHttpTrafficRecordsUseCase } from "../../../app/usecases/httpTrafficRecord/listHttpTrafficRecordsUseCase";
import { ListHttpTrafficRecordsController } from "../../controllers/httpTrafficRecord/listHttpTrafficRecordsController";

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
