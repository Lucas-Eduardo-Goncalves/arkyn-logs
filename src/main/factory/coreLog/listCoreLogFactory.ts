import { ListCoreLogsUseCase } from "../../../app/usecases/coreLog/listCoreLogsUseCase";
import { ListCoreLogsController } from "../../../infra/controllers/coreLog/listCoreLogsController";
import { PrismaCoreLogRepository } from "../../../infra/data/repositories/coreLog";

const prismaCoreLogRepository = new PrismaCoreLogRepository();
const listCoreLogsUseCase = new ListCoreLogsUseCase(prismaCoreLogRepository);
const listCoreLogsController = new ListCoreLogsController(listCoreLogsUseCase);

const listCoreLogs = {
  handle: listCoreLogsController.handle.bind(listCoreLogsController),
};

export { listCoreLogs };
