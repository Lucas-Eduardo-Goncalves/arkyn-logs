class LogErrorUpdateEvent {
  readonly logErrorId: string;

  constructor(props: LogErrorUpdateEvent) {
    this.logErrorId = props.logErrorId;
  }
}

export { LogErrorUpdateEvent };
