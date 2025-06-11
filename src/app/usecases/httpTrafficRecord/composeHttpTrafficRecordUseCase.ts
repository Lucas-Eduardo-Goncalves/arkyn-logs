import { ComposeHttpTrafficRecordEvent } from "../../../domain/events/composeHttpTrafficRecordEvent";
import { HttpMethod } from "../../../main/types/HttpMethod";
import { eventMediator } from "../../shared/eventMediator";

type InputProps = {
  domainUrl: string;
  pathnameUrl: string;
  trafficSourceId: string;
  status: number;
  protocol: "HTTP" | "HTTPS";
  method: HttpMethod;
  trafficUserId: string | null;
  requestHeaders: Record<string, string>;
  requestBody: Record<string, string> | null;
  queryParams: Record<string, string>;
  responseHeaders: Record<string, string>;
  responseBody: Record<string, string> | null;
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
