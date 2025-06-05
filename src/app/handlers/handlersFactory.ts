import { onComposeHttpTrafficRecordHandler } from "../../infra/factory/handlers/onComposeHttpTraffcRecordEventFactory";
import { eventMediator } from "../shared/eventMediator";

function handlersFactory() {
  eventMediator.subscribe(
    "composeHttpTrafficRecordEvent",
    onComposeHttpTrafficRecordHandler.handle
  );
}

export { handlersFactory };
