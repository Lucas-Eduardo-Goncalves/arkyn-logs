import { HttpAdapter } from "../../../infra/adapters/httpAdapter";
import { HttpTrafficRepository } from "../../repositories/httpTraffic/repository";

class DeleteHttpTrafficUseCase {
  constructor(private httpTrafficRepository: HttpTrafficRepository) {}

  async execute(httpTrafficId: string) {
    const httpTraffic = await this.httpTrafficRepository.findById(
      httpTrafficId
    );

    if (!httpTraffic) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.notFound("Http traffic not found");
    }

    await this.httpTrafficRepository.deleteHttpTraffic(httpTraffic.id);
  }
}

export { DeleteHttpTrafficUseCase };
