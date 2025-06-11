import { HttpAdapter } from "../../../infra/adapters/httpAdapter";
import { HttpMethod } from "../../../main/types/HttpMethod";
import { CoreLog } from "../../../domain/entities/coreLog";
import { CoreLogRepository } from "../../../domain/repositories/coreLog";
import { CorePathnameRepository } from "../../../domain/repositories/corePathname";
import { RequestRepository } from "../../../domain/repositories/request";
import { ResponseRepository } from "../../../domain/repositories/response";
import { TrafficSourceRepository } from "../../../domain/repositories/trafficSource";

type InputProps = {
  status: number;
  method: HttpMethod;
  elapsedTime: number;
  trafficUserId: string | null;
  trafficSourceId: string;
  corePathnameId: string;
  requestId: string;
  responseId: string;
};

class CreateCoreLogUseCase {
  constructor(
    private coreLogRepository: CoreLogRepository,
    private trafficSourceRepository: TrafficSourceRepository,
    private corePathnameRespository: CorePathnameRepository,
    private requestRepository: RequestRepository,
    private responseRepository: ResponseRepository
  ) {}

  async execute(input: InputProps) {
    const {
      trafficSourceId,
      corePathnameId,
      elapsedTime,
      method,
      requestId,
      responseId,
      status,
      trafficUserId,
    } = input;

    const [
      existsTrafficSource,
      existsCorePathname,
      existsRequest,
      existsResponse,
    ] = await Promise.all([
      await this.trafficSourceRepository.findById(trafficSourceId),
      await this.corePathnameRespository.findById(corePathnameId),
      await this.requestRepository.findById(requestId),
      await this.responseRepository.findById(responseId),
    ]);

    if (!existsTrafficSource) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.notFound("Traffic source not found");
    }

    if (!existsCorePathname) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.notFound("Core pathname not found");
    }

    if (!existsRequest) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.notFound("Request not found");
    }

    if (!existsResponse) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.notFound("Response not found");
    }

    const coreLog = CoreLog.create({
      trafficSourceId,
      corePathnameId,
      elapsedTime,
      method,
      requestId,
      responseId,
      status,
      trafficUserId,
    });

    await this.coreLogRepository.createCoreLog(coreLog);

    return coreLog.toJson();
  }
}

export { CreateCoreLogUseCase };
