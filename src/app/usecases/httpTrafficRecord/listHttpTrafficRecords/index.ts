import { HttpTrafficRepository } from "../../../repositories/httpTraffic";
import { HttpTrafficRecordRepository } from "../../../repositories/httpTrafficRecord";
import { ListHttpTrafficRecordsController } from "./listHttpTrafficRecordsController";
import { ListHttpTrafficRecordsUseCase } from "./listHttpTrafficRecordsUseCase";

const httpTrafficRecordRepository = new HttpTrafficRecordRepository();
const listHttpTrafficRecordsUseCase = new ListHttpTrafficRecordsUseCase(
  httpTrafficRecordRepository
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
