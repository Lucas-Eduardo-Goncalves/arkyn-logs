import { FormatDateAdapter } from "../../infra/adapters/formatDateAdapter";
import { IdAdapter } from "../../infra/adapters/idAdapter";

enum Method {
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
  "GET",
}

enum Level {
  "INFO",
  "FATAL",
  "WARNING",
}

type ConstructorProps = {
  id: string;
  status: number;
  method: Method;
  level: Level;
  trafficSourceId: string;
  domainId: string;
  pathnameId: string;
  createdAt: Date;
};

type CreateHttpTrafficProps = {
  status: number;
  method: Method;
  trafficSourceId: string;
  domainId: string;
  pathnameId: string;
};

type RestoreHttpTrafficProps = ConstructorProps;

class HttpTraffic {
  id: string;
  status: number;
  method: Method;
  level: Level;
  trafficSourceId: string;
  domainId: string;
  pathnameId: string;
  createdAt: Date;

  private constructor(props: ConstructorProps) {
    this.id = props.id;
    this.status = props.status;
    this.method = props.method;
    this.level = props.level;
    this.trafficSourceId = props.trafficSourceId;
    this.domainId = props.domainId;
    this.pathnameId = props.pathnameId;
    this.createdAt = props.createdAt;
  }

  private static getLevelByStatus(status: number): Level {
    if (status >= 400 && status < 500) return Level.WARNING;
    else if (status >= 500) return Level.FATAL;
    else return Level.INFO;
  }

  static create(props: CreateHttpTrafficProps) {
    return new HttpTraffic({
      id: new IdAdapter().generate(),
      status: props.status,
      method: props.method,
      level: this.getLevelByStatus(props.status),
      trafficSourceId: props.trafficSourceId,
      domainId: props.domainId,
      pathnameId: props.pathnameId,
      createdAt: new Date(),
    });
  }

  static restore(props: RestoreHttpTrafficProps) {
    return new HttpTraffic({
      id: props.id,
      status: props.status,
      method: props.method,
      level: props.level,
      trafficSourceId: props.trafficSourceId,
      domainId: props.domainId,
      pathnameId: props.pathnameId,
      createdAt: props.createdAt,
    });
  }

  toJson() {
    const formatDateAdapter = new FormatDateAdapter();
    const createdAt = formatDateAdapter.format(this.createdAt);

    return {
      id: this.id,
      status: this.status,
      method: this.method,
      level: this.level,
      trafficSourceId: this.trafficSourceId,
      domainId: this.domainId,
      pathnameId: this.pathnameId,
      createdAt: createdAt,
    };
  }
}

export { HttpTraffic };
