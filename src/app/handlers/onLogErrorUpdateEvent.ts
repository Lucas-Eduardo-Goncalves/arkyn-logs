import { LogErrorUpdateEvent } from "../events/logErrorUpdateEvent";
import { updateLogError } from "../usecases/logError/updateLogChannel";

class OnLogErrorUpdateEvent {
  constructor() {}

  async handle(props: LogErrorUpdateEvent) {
    await updateLogError.handle(props.route, props.logErrorId);
  }
}

export { OnLogErrorUpdateEvent };
