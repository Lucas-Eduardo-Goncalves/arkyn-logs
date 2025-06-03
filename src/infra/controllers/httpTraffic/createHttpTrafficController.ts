import { CreateHttpTrafficUseCase } from "../../../app/usecases/httpTraffic/createHttpTrafficUseCase";
import { RouteDTO } from "../../../main/types/RouteDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";
import { SchemaValidatorAdapter } from "../../adapters/schemaValidatorAdapter";
import { AuthMiddleware } from "../../middlewares/authMiddleware";
import { createHttpTrafficSchema } from "../../schemas/internal/httpTraffic";

class CreateHttpTrafficController {
  constructor(private createHttpTrafficUseCase: CreateHttpTrafficUseCase) {}

  async handle(route: RouteDTO) {
    try {
      await AuthMiddleware.authenticate(route);
      const trafficSourceId = route.request.params?.trafficSourceId;
      const schemaValidator = new SchemaValidatorAdapter(
        createHttpTrafficSchema
      );

      const data = schemaValidator.validate({
        ...route.request.body,
        trafficSourceId,
      });

      const trafficsource = await this.createHttpTrafficUseCase.execute(data);
      return route.response.json(trafficsource, 201);
    } catch (error) {
      const errorHandlerAdapter = new ErrorHandlerAdapter();
      return errorHandlerAdapter.handle(error);
    }
  }
}

export { CreateHttpTrafficController };
