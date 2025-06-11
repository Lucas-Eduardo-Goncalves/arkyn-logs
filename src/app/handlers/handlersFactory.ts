import { onComposeHttpTrafficRecordHandler } from "../../main/factory/handlers/onComposeHttpTraffcRecordEventFactory";
import { eventMediator } from "../shared/eventMediator";

function handlersFactory() {
  eventMediator.subscribe(
    "composeHttpTrafficRecordEvent",
    onComposeHttpTrafficRecordHandler.handle
  );
}

export { handlersFactory };
