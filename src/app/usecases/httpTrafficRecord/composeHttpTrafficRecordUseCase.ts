import { ComposeHttpTrafficRecordEvent } from "../../events/composeHttpTrafficRecordEvent";
import { eventMediator } from "../../shared/eventMediator";

type InputProps = {
  domainUrl: string;
  pathnameUrl: string;
  trafficSourceId: string;
  status: number;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  trafficUserId: string | null;
  requestHeaders: Record<string, string>;
  requestBody: Record<string, string>;
  queryParams: Record<string, string>;
  responseHeaders: Record<string, string>;
  responseBody: Record<string, string>;
};

class ComposeHttpTrafficRecordUseCase {
  constructor() {}

  async execute(input: InputProps) {
    const {
      domainUrl,
      pathnameUrl,
      trafficSourceId,
      status,
      method,
      trafficUserId,
      requestHeaders,
      requestBody,
      queryParams,
      responseHeaders,
      responseBody,
    } = input;

    await eventMediator.publish(
      "composeHttpTrafficRecordEvent",
      new ComposeHttpTrafficRecordEvent({
        domainUrl,
        pathnameUrl,
        trafficSourceId,
        status,
        method,
        trafficUserId,
        requestHeaders,
        requestBody,
        queryParams,
        responseHeaders,
        responseBody,
      })
    );

    return;
  }
}

export { ComposeHttpTrafficRecordUseCase };
