import { FormatDateAdapter } from "../../infra/adapters/formatDateAdapter";
import { IdAdapter } from "../../infra/adapters/idAdapter";

type ConstructorProps = {
  id: string;
  value: string;
  trafficSourceId: string;
  createdAt: Date;
};

type CreateDomainProps = {
  value: string;
  trafficSourceId: string;
};

type RestoreDomainProps = ConstructorProps;

class Domain {
  id: string;
  value: string;
  trafficSourceId: string;
  createdAt: Date;

  private constructor(props: ConstructorProps) {
    this.id = props.id;
    this.value = props.value;
    this.trafficSourceId = props.trafficSourceId;
    this.createdAt = props.createdAt;
  }

  static create(props: CreateDomainProps) {
    return new Domain({
      id: new IdAdapter().generate(),
      value: props.value,
      trafficSourceId: props.trafficSourceId,
      createdAt: new Date(),
    });
  }

  static restore(props: RestoreDomainProps) {
    return new Domain({
      id: props.id,
      value: props.value,
      trafficSourceId: props.trafficSourceId,
      createdAt: props.createdAt,
    });
  }

  toJson() {
    const formatDateAdapter = new FormatDateAdapter();
    const createdAt = formatDateAdapter.format(this.createdAt);

    return {
      id: this.id,
      value: this.value,
      trafficSourceId: this.trafficSourceId,
      createdAt: createdAt,
    };
  }
}

export { Domain };
