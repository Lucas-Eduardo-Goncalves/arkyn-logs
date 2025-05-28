class LogErrorCreatedEvent {
  readonly logErrorId: string;

  constructor(props: LogErrorCreatedEvent) {
    this.logErrorId = props.logErrorId;
  }
}

export { LogErrorCreatedEvent };
