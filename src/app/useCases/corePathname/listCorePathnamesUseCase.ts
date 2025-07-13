import { CorePathnameRepository } from "../../../domain/repositories/corePathname";
import { CorePathnameSearchParams } from "../../search/corePathnameSearchParams";

type InputProps = {
  page?: number;
  pageLimit?: number;
  sort?: string | null;
  sortDirection?: "asc" | "desc";

  filter: {
    trafficSourceId: string;
  };
};

class ListCorePathnamesUseCase {
  constructor(private corePathnameRepository: CorePathnameRepository) {}

  async execute(input: InputProps) {
    const searchParams = new CorePathnameSearchParams(input);

    const corePathnames = await this.corePathnameRepository.findAll(
      searchParams
    );

    return corePathnames.toJson();
  }
}

export { ListCorePathnamesUseCase };
