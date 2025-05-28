import { eventMediator } from "../shared/eventMediator";
import { OnLogErrorUpdateEvent } from "./onLogErrorUpdateEvent";

function handlersFactory() {
  eventMediator.subscribe(
    "logErrorUpdateEvent",
    new OnLogErrorUpdateEvent().handle
  );
}

export { handlersFactory };
