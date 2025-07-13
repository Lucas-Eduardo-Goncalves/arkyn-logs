import { CreateHttpTrafficUseCase } from "../../../app/usecases/httpTraffic/createHttpTrafficUseCase";
import { AuthMiddleware } from "../../../main/middlewares/authMiddleware";
import { RouteDTO } from "../../../main/types/RouteDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";
import { SchemaValidatorAdapter } from "../../adapters/schemaValidatorAdapter";
import { createHttpTrafficSchema } from "../../schemas/internal/httpTraffic";

class CreateHttpTrafficController {
  constructor(private createHttpTrafficUseCase: CreateHttpTrafficUseCase) {}

  async handle(route: RouteDTO) {
    try {
      const { userId } = await AuthMiddleware.authenticate(route);
      const trafficSourceId = route.request.params?.trafficSourceId;
      const schemaValidator = new SchemaValidatorAdapter(
        createHttpTrafficSchema
      );

      const data = schemaValidator.validate({
        ...route.request.body,
        trafficSourceId,
      });

      const httpTraffic = await this.createHttpTrafficUseCase.execute(
        data,
        userId
      );
      return route.response.json(httpTraffic, 201);
    } catch (error) {
      const errorHandlerAdapter = new ErrorHandlerAdapter();
      return errorHandlerAdapter.handle(error);
    }
  }
}

export { CreateHttpTrafficController };
