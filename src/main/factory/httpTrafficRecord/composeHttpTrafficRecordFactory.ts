import { ComposeHttpTrafficRecordUseCase } from "../../../app/useCases/httpTrafficRecord/composeHttpTrafficRecordUseCase";
import { ComposeHttpTrafficRecordController } from "../../../infra/controllers/httpTrafficRecord/composeHttpTrafficRecordController";

const composeHttpTrafficRecordUseCase = new ComposeHttpTrafficRecordUseCase();

const composeHttpTrafficRecordController =
  new ComposeHttpTrafficRecordController(composeHttpTrafficRecordUseCase);

const composeHttpTrafficRecord = {
  handle: composeHttpTrafficRecordController.handle.bind(
    composeHttpTrafficRecordController
  ),
};

export { composeHttpTrafficRecord };
