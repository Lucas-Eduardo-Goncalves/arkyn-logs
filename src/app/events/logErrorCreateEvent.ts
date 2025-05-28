class LogErrorCreateEvent {
  readonly logChannelId: string;
  readonly message: string;
  readonly metadata: any;

  constructor(props: LogErrorCreateEvent) {
    this.logChannelId = props.logChannelId;
    this.message = props.message;
    this.metadata = props.metadata || {};
  }
}

export { LogErrorCreateEvent };
