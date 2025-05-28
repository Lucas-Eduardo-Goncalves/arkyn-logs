import { LogErrorCreateEvent } from "../events/logErrorCreateEvent";
import { createLogError } from "../usecases/logError/createLogError";

class OnLogErrorCreateEvent {
  constructor() {}

  async handle(props: LogErrorCreateEvent) {
    await createLogError.handle(
      props.logChannelId,
      props.message,
      props.metadata
    );
  }
}

export { OnLogErrorCreateEvent };
