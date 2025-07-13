import { HttpTrafficRecordDAL } from "../../../domain/dal/httpTrafficRecord";
import { HttpMethod } from "../../../main/types/HttpMethod";
import { HttpTrafficRecordSearchParams } from "../../search/httpTrafficRecordSearchParams";

type InputProps = {
  page?: number;
  pageLimit?: number;
  sort?: string | null;
  sortDirection?: "asc" | "desc";

  filter: {
    requestHeaders?: any;
    requestBody?: any;
    responseHeaders?: any;
    responseBody?: any;
    queryParams?: any;
    method?: HttpMethod;
    level?: "INFO" | "WARNING" | "DEBUG";
    trafficSourceId: string;
    status?: number;
    protocol?: "HTTP" | "HTTPS";
  };
};

class ListHttpTrafficRecordsUseCase {
  constructor(private httpTrafficRecordDAL: HttpTrafficRecordDAL) {}

  async execute(input: InputProps) {
    const searchParams = new HttpTrafficRecordSearchParams(input);
    const httpTraffics = await this.httpTrafficRecordDAL.findAll(searchParams);
    return httpTraffics.toJson();
  }
}

export { ListHttpTrafficRecordsUseCase };
