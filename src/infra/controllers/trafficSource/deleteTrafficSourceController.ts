import { DeleteTrafficSourceUseCase } from "../../../app/usecases/trafficSource/deleteTrafficSourceUseCase";
import { RouteDTO } from "../../../main/types/RouteDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";
import { SchemaValidatorAdapter } from "../../adapters/schemaValidatorAdapter";
import { AuthMiddleware } from "../../middlewares/authMiddleware";
import { deleteTrafficSourceSchema } from "../../schemas/internal/trafficSource";

class DeleteTrafficSourceController {
  constructor(private deleteTrafficSourceUseCase: DeleteTrafficSourceUseCase) {}

  async handle(route: RouteDTO) {
    try {
      await AuthMiddleware.authenticate(route);
      const trafficSourceId = route.request.params?.trafficSourceId;

      const schemaValidator = new SchemaValidatorAdapter(
        deleteTrafficSourceSchema
      );
      const validatedBody = schemaValidator.validate({ trafficSourceId });

      const trafficsource = await this.deleteTrafficSourceUseCase.execute(
        validatedBody.trafficSourceId
      );

      return route.response.json(trafficsource);
    } catch (error) {
      const errorHandlerAdapter = new ErrorHandlerAdapter();
      return errorHandlerAdapter.handle(error);
    }
  }
}

export { DeleteTrafficSourceController };
