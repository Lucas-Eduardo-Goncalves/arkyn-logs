import { RouteDTO } from "../../main/types/RouteDTO";

class LogErrorUpdateEvent {
  readonly route: RouteDTO;
  readonly logErrorId: string;

  constructor(props: LogErrorUpdateEvent) {
    this.route = props.route;
    this.logErrorId = props.logErrorId;
  }
}

export { LogErrorUpdateEvent };
