import { HttpAdapter } from "../../../infra/adapters/httpAdapter";
import { HttpMethod } from "../../../main/types/HttpMethod";
import { CoreLog } from "../../entities/coreLog";
import { CoreLogRepository } from "../../repositories/coreLog/repository";
import { TrafficSourceRepository } from "../../repositories/trafficSource/repository";

type InputProps = {
  status: number;
  method: HttpMethod;
  elapsedTime: number;
  trafficUserId: string | null;
  value: string;
  trafficSourceId: string;
  corePathnameId: string;
  requestId: string;
  responseId: string;
};

class CreateCoreLogUseCase {
  constructor(
    private coreLogRepository: CoreLogRepository,
    private trafficSourceRepository: TrafficSourceRepository
  ) {}

  async execute(input: InputProps) {
    const { trafficSourceId, value } = input;

    const [existsTrafficSource, existsCoreLog] = await Promise.all([
      await this.trafficSourceRepository.findById(trafficSourceId),
      await this.coreLogRepository.findByValue(value),
    ]);

    if (!existsTrafficSource) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.notFound("Traffic source not found");
    }

    if (existsCoreLog) return existsCoreLog.toJson();

    const coreLog = CoreLog.create({
      trafficSourceId,
      value,
    });

    await this.coreLogRepository.createCoreLog(coreLog);

    return coreLog.toJson();
  }
}

export { CreateCoreLogUseCase };
