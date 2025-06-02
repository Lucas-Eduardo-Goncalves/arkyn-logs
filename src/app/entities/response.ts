import { FormatDateAdapter } from "../../infra/adapters/formatDateAdapter";
import { IdAdapter } from "../../infra/adapters/idAdapter";

type ConstructorProps = {
  id: string;
  headers: Record<string, string>;
  body: Record<string, string>;
  httpTrafficId: string;
  createdAt: Date;
};

type CreateResponseProps = {
  headers: Record<string, string>;
  body: Record<string, string>;
  httpTrafficId: string;
};

type RestoreResponseProps = ConstructorProps;

class Response {
  id: string;
  headers: Record<string, string>;
  body: Record<string, string>;
  httpTrafficId: string;
  createdAt: Date;

  private constructor(props: ConstructorProps) {
    this.id = props.id;
    this.headers = props.headers;
    this.body = props.body;
    this.httpTrafficId = props.httpTrafficId;
    this.createdAt = props.createdAt;
  }

  static create(props: CreateResponseProps) {
    return new Response({
      id: new IdAdapter().generate(),
      headers: props.headers,
      body: props.body,
      httpTrafficId: props.httpTrafficId,
      createdAt: new Date(),
    });
  }

  static restore(props: RestoreResponseProps) {
    return new Response({
      id: props.id,
      headers: props.headers,
      body: props.body,
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
      httpTrafficId: this.httpTrafficId,
      createdAt: createdAt,
    };
  }
}

export { Response };
