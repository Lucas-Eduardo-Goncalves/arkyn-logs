import { CorePathnameSearchParams } from "../../app/search/corePathnameSearchParams";
import { SearchResult } from "../../app/shared/searchResult";
import { CorePathname } from "../entities/corePathname";

type CorePathnameRepository = {
  findAll: (
    searchParams: CorePathnameSearchParams
  ) => Promise<SearchResult<CorePathname>>;
  findById: (corePathnameId: string) => Promise<CorePathname | null>;
  findByValue: (value: string) => Promise<CorePathname | null>;
  createCorePathname: (corePathname: CorePathname) => Promise<CorePathname>;
  deleteCorePathname: (corePathnameId: string) => Promise<void>;
};

export type { CorePathnameRepository };
