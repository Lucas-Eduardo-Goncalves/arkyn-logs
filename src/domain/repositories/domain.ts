import { DomainSearchParams } from "../../app/search/domainSearchParams";
import { SearchResult } from "../../app/shared/searchResult";
import { Domain } from "../entities/domain";

type DomainRepository = {
  findAll: (searchParams: DomainSearchParams) => Promise<SearchResult<Domain>>;
  findById: (domainId: string) => Promise<Domain | null>;
  findByValue: (value: string) => Promise<Domain | null>;
  createDomain: (domain: Domain) => Promise<Domain>;
  deleteDomain: (domainId: string) => Promise<void>;
};

export type { DomainRepository };
