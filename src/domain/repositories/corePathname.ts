import { CorePathname } from "../entities/corePathname";

type CorePathnameRepository = {
  findAll: (trafficSourceId: string) => Promise<CorePathname[]>;
  findById: (corePathnameId: string) => Promise<CorePathname | null>;
  findByValue: (value: string) => Promise<CorePathname | null>;
  createCorePathname: (corePathname: CorePathname) => Promise<CorePathname>;
  deleteCorePathname: (corePathnameId: string) => Promise<void>;
};

export type { CorePathnameRepository };
