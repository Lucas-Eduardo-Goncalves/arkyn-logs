import { UpdateTrafficSourceUseCase } from "../../../app/usecases/trafficSource/updateTrafficSourceUseCase";
import { RouteDTO } from "../../../main/types/RouteDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";
import { SchemaValidatorAdapter } from "../../adapters/schemaValidatorAdapter";
import { AuthMiddleware } from "../../middlewares/authMiddleware";
import { updateTrafficSourceSchema } from "../../schemas/internal/trafficSource";

class UpdateTrafficSourceController {
  constructor(private updateTrafficSourceUseCase: UpdateTrafficSourceUseCase) {}

  async handle(route: RouteDTO) {
    try {
      await AuthMiddleware.authenticate(route);
      const trafficSourceId = route.request.params?.trafficSourceId;

      const schemaValidator = new SchemaValidatorAdapter(
        updateTrafficSourceSchema
      );

      const data = schemaValidator.validate({
        ...route.request.body,
        trafficSourceId,
      });

      const trafficsource = await this.updateTrafficSourceUseCase.execute(data);
      return route.response.json(trafficsource, 201);
    } catch (error) {
      const errorHandlerAdapter = new ErrorHandlerAdapter();
      return errorHandlerAdapter.handle(error);
    }
  }
}

export { UpdateTrafficSourceController };
