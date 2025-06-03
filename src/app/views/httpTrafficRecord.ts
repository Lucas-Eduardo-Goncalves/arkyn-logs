import { Pathname } from "@prisma/client";
import { FormatDateAdapter } from "../../infra/adapters/formatDateAdapter";
import { HttpTraffic } from "../entities/httpTraffic";
import { Request } from "../entities/request";
import { Response } from "../entities/response";
import { Domain } from "../entities/domain";
import { HttpAdapter } from "../../infra/adapters/httpAdapter";

type ConstructorProps = {
  _httpTraffic: HttpTraffic;
  _request: Request;
  _response: Response;
  _domain: Domain;
  _pathname: Pathname;
};

type RestoreHttpTrafficRecordProps = {
  _httpTraffic: HttpTraffic;
  _request: Request | null;
  _response: Response | null;
  _domain: Domain;
  _pathname: Pathname;
};

class HttpTrafficRecord {
  _httpTraffic: HttpTraffic;
  _request: Request | null;
  _response: Response | null;
  _domain: Domain;
  _pathname: Pathname;

  private constructor(props: ConstructorProps) {
    this._httpTraffic = props._httpTraffic;
    this._request = props._request;
    this._response = props._response;
    this._domain = props._domain;
    this._pathname = props._pathname;
  }

  static restore(props: RestoreHttpTrafficRecordProps) {
    if (!props._request) {
      const httpAdapter = new HttpAdapter();
      const errorMessage = "_request is required to restore HttpTrafficRecord";
      throw httpAdapter.serverError(errorMessage);
    }

    if (!props._response) {
      const httpAdapter = new HttpAdapter();
      const errorMessage = "_response is required to restore HttpTrafficRecord";
      throw httpAdapter.serverError(errorMessage);
    }

    return new HttpTrafficRecord({
      _httpTraffic: props._httpTraffic,
      _request: props._request,
      _response: props._response,
      _domain: props._domain,
      _pathname: props._pathname,
    });
  }

  toJson() {
    const formatDateAdapter = new FormatDateAdapter();
    const createdAt = formatDateAdapter.format(this._httpTraffic.createdAt);

    return {
      id: this._httpTraffic.id,
      status: this._httpTraffic.status,
      method: this._httpTraffic.method,
      level: this._httpTraffic.level,
      trafficUserId: this._httpTraffic.trafficUserId,
      trafficSourceId: this._httpTraffic.trafficSourceId,
      domain: this._domain.value,
      pathname: this._pathname.value,
      request: this._request?.toJson() ?? null,
      response: this._response?.toJson() ?? null,
      createdAt: createdAt,
    };
  }
}

export { HttpTrafficRecord };
