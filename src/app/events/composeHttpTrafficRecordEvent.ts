class ComposeHttpTrafficRecordEvent {
  readonly domainUrl: string;
  readonly pathnameUrl: string;
  readonly trafficSourceId: string;
  readonly status: number;
  readonly protocol: "HTTP" | "HTTPS";
  readonly method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  readonly trafficUserId: string | null;
  readonly elapsedTime: number;
  readonly requestHeaders: Record<string, string>;
  readonly requestBody: Record<string, string>;
  readonly queryParams: Record<string, string>;
  readonly responseHeaders: Record<string, string>;
  readonly responseBody: Record<string, string>;

  constructor(data: ComposeHttpTrafficRecordEvent) {
    this.domainUrl = data.domainUrl;
    this.pathnameUrl = data.pathnameUrl;
    this.trafficSourceId = data.trafficSourceId;
    this.status = data.status;
    this.protocol = data.protocol;
    this.method = data.method;
    this.elapsedTime = data.elapsedTime;
    this.trafficUserId = data.trafficUserId;
    this.requestHeaders = data.requestHeaders;
    this.requestBody = data.requestBody;
    this.queryParams = data.queryParams;
    this.responseHeaders = data.responseHeaders;
    this.responseBody = data.responseBody;
  }
}

export { ComposeHttpTrafficRecordEvent };
