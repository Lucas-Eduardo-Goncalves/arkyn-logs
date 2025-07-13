import { DeleteHttpTrafficUseCase } from "../../../app/usecases/httpTraffic/deleteHttpTrafficUseCase";
import { AuthMiddleware } from "../../../main/middlewares/authMiddleware";
import { RouteDTO } from "../../../main/types/RouteDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";
import { SchemaValidatorAdapter } from "../../adapters/schemaValidatorAdapter";
import { deleteHttpTrafficSchema } from "../../schemas/internal/httpTraffic";

class DeleteHttpTrafficController {
  constructor(private deleteHttpTrafficUseCase: DeleteHttpTrafficUseCase) {}

  async handle(route: RouteDTO) {
    try {
      const { userId } = await AuthMiddleware.authenticate(route);
      const httpTrafficId = route.request.params?.httpTrafficId;

      const schemaValidator = new SchemaValidatorAdapter(
        deleteHttpTrafficSchema
      );
      const validatedBody = schemaValidator.validate({ httpTrafficId });

      const httpTraffic = await this.deleteHttpTrafficUseCase.execute(
        validatedBody.httpTrafficId,
        userId
      );

      return route.response.json(httpTraffic);
    } catch (error) {
      const errorHandlerAdapter = new ErrorHandlerAdapter();
      return errorHandlerAdapter.handle(error);
    }
  }
}

export { DeleteHttpTrafficController };
