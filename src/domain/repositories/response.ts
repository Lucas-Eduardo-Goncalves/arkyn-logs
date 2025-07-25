import { ResponseSearchParams } from "../../app/search/responseSearchParams";
import { SearchResult } from "../../app/shared/searchResult";
import { Response } from "../entities/response";

type ResponseRepository = {
  findAll: (
    searchParams: ResponseSearchParams
  ) => Promise<SearchResult<Response>>;
  findById: (responseId: string) => Promise<Response | null>;
  createResponse: (response: Response) => Promise<Response>;
  deleteResponse: (responseId: string) => Promise<void>;
};

export type { ResponseRepository };
