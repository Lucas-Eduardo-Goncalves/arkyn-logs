import { FormatDateAdapter } from "../../infra/adapters/formatDateAdapter";
import { IdAdapter } from "../../infra/adapters/idAdapter";

type ConstructorProps = {
  id: string;
  headers: Record<string, string>;
  body: Record<string, string> | null;
  createdAt: Date;
};

type CreateResponseProps = {
  headers: Record<string, string>;
  body: Record<string, string> | null;
};

type RestoreResponseProps = ConstructorProps;

class Response {
  id: string;
  headers: Record<string, string>;
  body: Record<string, string> | null;
  createdAt: Date;

  private constructor(props: ConstructorProps) {
    this.id = props.id;
    this.headers = props.headers;
    this.body = props.body;
    this.createdAt = props.createdAt;
  }

  static create(props: CreateResponseProps) {
    return new Response({
      id: new IdAdapter().generate(),
      headers: props.headers,
      body: props.body,
      createdAt: new Date(),
    });
  }

  static restore(props: RestoreResponseProps) {
    return new Response({
      id: props.id,
      headers: props.headers,
      body: props.body,
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
      createdAt: createdAt,
    };
  }
}

export { Response };
