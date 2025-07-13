import { DeleteCorePathnameUseCase } from "../../../app/useCases/corePathname/deleteCorePathnameUseCase";
import { RouteDTO } from "../../../main/types/RouteDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";
import { SchemaValidatorAdapter } from "../../adapters/schemaValidatorAdapter";
import { AuthMiddleware } from "../../../main/middlewares/authMiddleware";
import { deleteCorePathnameSchema } from "../../schemas/internal/corePathname";

class DeleteCorePathnameController {
  constructor(private deleteCorePathnameUseCase: DeleteCorePathnameUseCase) {}

  async handle(route: RouteDTO) {
    try {
      await AuthMiddleware.authenticate(route);
      const corePathnameId = route.request.params?.corePathnameId;

      const schemaValidator = new SchemaValidatorAdapter(
        deleteCorePathnameSchema
      );

      const validatedBody = schemaValidator.validate({ corePathnameId });

      const trafficsource = await this.deleteCorePathnameUseCase.execute(
        validatedBody.corePathnameId
      );

      return route.response.json(trafficsource);
    } catch (error) {
      const errorHandlerAdapter = new ErrorHandlerAdapter();
      return errorHandlerAdapter.handle(error);
    }
  }
}

export { DeleteCorePathnameController };
