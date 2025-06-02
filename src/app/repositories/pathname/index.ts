import { HttpAdapter } from "../../../infra/adapters/httpAdapter";
import { PathnameMapper } from "../../../infra/mappers/pathname";
import { Pathname } from "../../entities/pathname";
import { PathnameRepositoryDTO } from "./repositoryDTO";

class PathnameRepository implements PathnameRepositoryDTO {
  static pathnames: Pathname[] = [];

  async findAll(trafficSourceId: string): Promise<Pathname[]> {
    return PathnameRepository.pathnames
      .filter((pathname) => pathname.trafficSourceId === trafficSourceId)
      .map((pathname) => PathnameMapper.toEntity(pathname));
  }

  async findById(pathnameId: string): Promise<Pathname | null> {
    const pathname = PathnameRepository.pathnames.find(
      (pathname) => pathname.id === pathnameId
    );
    if (!pathname) return null;
    return PathnameMapper.toEntity(pathname);
  }

  async findByValue(value: string): Promise<Pathname | null> {
    const pathname = PathnameRepository.pathnames.find(
      (pathname) => pathname.value === value
    );

    if (!pathname) return null;
    return PathnameMapper.toEntity(pathname);
  }

  async createPathname(pathname: Pathname): Promise<Pathname> {
    PathnameRepository.pathnames.push(pathname);
    return pathname;
  }

  async updatePathname(pathname: Pathname): Promise<Pathname> {
    const index = PathnameRepository.pathnames.findIndex(
      (u) => u.id === pathname.id
    );
    const httpAdpter = new HttpAdapter();
    if (index === -1) httpAdpter.serverError("Pathname not found");
    PathnameRepository.pathnames[index] = pathname;
    return pathname;
  }

  async deletePathname(pathnameId: string): Promise<void> {
    const index = PathnameRepository.pathnames.findIndex(
      (pathname) => pathname.id === pathnameId
    );
    const httpAdpter = new HttpAdapter();
    if (index === -1) httpAdpter.serverError("Pathname not found");
    PathnameRepository.pathnames.splice(index, 1);
  }
}

export { PathnameRepository };
