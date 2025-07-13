import { DeletePathnameUseCase } from "../../../app/usecases/pathname/deletePathnameUseCase";
import { AuthMiddleware } from "../../../main/middlewares/authMiddleware";
import { RouteDTO } from "../../../main/types/RouteDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";
import { SchemaValidatorAdapter } from "../../adapters/schemaValidatorAdapter";
import { deletePathnameSchema } from "../../schemas/internal/pathname";

class DeletePathnameController {
  constructor(private deletePathnameUseCase: DeletePathnameUseCase) {}

  async handle(route: RouteDTO) {
    try {
      const { userId } = await AuthMiddleware.authenticate(route);
      const pathnameId = route.request.params?.pathnameId;

      const schemaValidator = new SchemaValidatorAdapter(deletePathnameSchema);
      const validatedBody = schemaValidator.validate({ pathnameId });

      const pathname = await this.deletePathnameUseCase.execute(
        validatedBody.pathnameId,
        userId
      );

      return route.response.json(pathname);
    } catch (error) {
      const errorHandlerAdapter = new ErrorHandlerAdapter();
      return errorHandlerAdapter.handle(error);
    }
  }
}

export { DeletePathnameController };
