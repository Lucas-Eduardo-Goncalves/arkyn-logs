import { DeleteHttpTrafficUseCase } from "../../../app/usecases/httpTraffic/deleteHttpTrafficUseCase";
import { RouteDTO } from "../../../main/types/RouteDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";
import { SchemaValidatorAdapter } from "../../adapters/schemaValidatorAdapter";
import { AuthMiddleware } from "../../../main/middlewares/authMiddleware";
import { deleteHttpTrafficSchema } from "../../schemas/internal/httpTraffic";

class DeleteHttpTrafficController {
  constructor(private deleteHttpTrafficUseCase: DeleteHttpTrafficUseCase) {}

  async handle(route: RouteDTO) {
    try {
      await AuthMiddleware.authenticate(route);
      const httpTrafficId = route.request.params?.httpTrafficId;

      const schemaValidator = new SchemaValidatorAdapter(
        deleteHttpTrafficSchema
      );
      const validatedBody = schemaValidator.validate({ httpTrafficId });

      const trafficsource = await this.deleteHttpTrafficUseCase.execute(
        validatedBody.httpTrafficId
      );

      return route.response.json(trafficsource);
    } catch (error) {
      const errorHandlerAdapter = new ErrorHandlerAdapter();
      return errorHandlerAdapter.handle(error);
    }
  }
}

export { DeleteHttpTrafficController };
