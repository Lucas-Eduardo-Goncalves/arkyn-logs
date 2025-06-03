import { Domain } from "../../entities/domain";

type DomainRepository = {
  findAll: (trafficSourceId: string) => Promise<Domain[]>;
  findById: (domainId: string) => Promise<Domain | null>;
  findByValue: (value: string) => Promise<Domain | null>;
  createDomain: (domain: Domain) => Promise<Domain>;
  deleteDomain: (domainId: string) => Promise<void>;
};

export type { DomainRepository };
