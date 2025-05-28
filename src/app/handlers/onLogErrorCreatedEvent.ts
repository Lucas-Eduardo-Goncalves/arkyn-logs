import { LogErrorCreatedEvent } from "../events/logErrorCreatedEvent";

class OnLogErrorCreatedEvent {
  constructor() {}

  async handle(props: LogErrorCreatedEvent) {}
}

export { OnLogErrorCreatedEvent };
