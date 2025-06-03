import { DeletePathnameUseCase } from "../../../app/usecases/pathname/deletePathnameUseCase";
import { RouteDTO } from "../../../main/types/RouteDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";
import { SchemaValidatorAdapter } from "../../adapters/schemaValidatorAdapter";
import { AuthMiddleware } from "../../middlewares/authMiddleware";
import { deletePathnameSchema } from "../../schemas/internal/pathname";

class DeletePathnameController {
  constructor(private deletePathnameUseCase: DeletePathnameUseCase) {}

  async handle(route: RouteDTO) {
    try {
      await AuthMiddleware.authenticate(route);
      const pathnameId = route.request.params?.pathnameId;

      const schemaValidator = new SchemaValidatorAdapter(deletePathnameSchema);
      const validatedBody = schemaValidator.validate({ pathnameId });

      const trafficsource = await this.deletePathnameUseCase.execute(
        validatedBody.pathnameId
      );

      return route.response.json(trafficsource);
    } catch (error) {
      const errorHandlerAdapter = new ErrorHandlerAdapter();
      return errorHandlerAdapter.handle(error);
    }
  }
}

export { DeletePathnameController };
