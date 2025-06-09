import { ComposeHttpTrafficRecordEvent } from "../../events/composeHttpTrafficRecordEvent";
import { eventMediator } from "../../shared/eventMediator";

type InputProps = {
  domainUrl: string;
  pathnameUrl: string;
  trafficSourceId: string;
  status: number;
  protocol: "HTTP" | "HTTPS";
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  trafficUserId: string | null;
  requestHeaders: Record<string, string>;
  requestBody: Record<string, string>;
  queryParams: Record<string, string>;
  responseHeaders: Record<string, string>;
  responseBody: Record<string, string>;
  elapsedTime: number;
};

class ComposeHttpTrafficRecordUseCase {
  constructor() {}

  async execute(input: InputProps) {
    const {
      domainUrl,
      pathnameUrl,
      trafficSourceId,
      status,
      protocol,
      method,
      trafficUserId,
      requestHeaders,
      requestBody,
      queryParams,
      responseHeaders,
      responseBody,
      elapsedTime,
    } = input;

    await eventMediator.publish(
      "composeHttpTrafficRecordEvent",
      new ComposeHttpTrafficRecordEvent({
        domainUrl,
        pathnameUrl,
        trafficSourceId,
        status,
        protocol,
        method,
        trafficUserId,
        requestHeaders,
        requestBody,
        queryParams,
        responseHeaders,
        responseBody,
        elapsedTime,
      })
    );

    return;
  }
}

export { ComposeHttpTrafficRecordUseCase };
