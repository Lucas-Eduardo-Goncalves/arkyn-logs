import { Pathname } from "../entities/pathname";

type PathnameRepository = {
  findAll: (trafficSourceId: string, domainId: string) => Promise<Pathname[]>;
  findById: (pathnameId: string) => Promise<Pathname | null>;
  findByValue: (value: string) => Promise<Pathname | null>;
  createPathname: (pathname: Pathname) => Promise<Pathname>;
  deletePathname: (pathnameId: string) => Promise<void>;
};

export type { PathnameRepository };
