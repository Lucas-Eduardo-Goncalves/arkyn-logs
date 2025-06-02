import { FormatDateAdapter } from "../../infra/adapters/formatDateAdapter";
import { IdAdapter } from "../../infra/adapters/idAdapter";

type ConstructorProps = {
  id: string;
  headers: Record<string, string>;
  body: Record<string, string>;
  queryParams: Record<string, string>;
  httpTrafficId: string;
  createdAt: Date;
};

type CreateRequestProps = {
  headers: Record<string, string>;
  body: Record<string, string>;
  queryParams: Record<string, string>;
  httpTrafficId: string;
};

type RestoreRequestProps = ConstructorProps;

class Request {
  id: string;
  headers: Record<string, string>;
  body: Record<string, string>;
  queryParams: Record<string, string>;
  httpTrafficId: string;
  createdAt: Date;

  private constructor(props: ConstructorProps) {
    this.id = props.id;
    this.headers = props.headers;
    this.body = props.body;
    this.queryParams = props.queryParams;
    this.httpTrafficId = props.httpTrafficId;
    this.createdAt = props.createdAt;
  }

  static create(props: CreateRequestProps) {
    return new Request({
      id: new IdAdapter().generate(),
      headers: props.headers,
      body: props.body,
      queryParams: props.queryParams,
      httpTrafficId: props.httpTrafficId,
      createdAt: new Date(),
    });
  }

  static restore(props: RestoreRequestProps) {
    return new Request({
      id: props.id,
      headers: props.headers,
      body: props.body,
      queryParams: props.queryParams,
      httpTrafficId: props.httpTrafficId,
      createdAt: props.createdAt,
    });
  }

  toJson() {
    const formatDateAdapter = new FormatDateAdapter();
    const createdAt = formatDateAdapter.format(this.createdAt);

    return {
      id: this.id,
      headers: this.headers,
      body: this.body,
      queryParams: this.queryParams,
      httpTrafficId: this.httpTrafficId,
      createdAt: createdAt,
    };
  }
}

export { Request };
