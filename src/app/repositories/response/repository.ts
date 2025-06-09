import { Response } from "../../entities/response";

type ResponseRepository = {
  findAll: () => Promise<Response[]>;
  findById: (responseId: string) => Promise<Response | null>;
  createResponse: (response: Response) => Promise<Response>;
  deleteResponse: (responseId: string) => Promise<void>;
};

export type { ResponseRepository };
