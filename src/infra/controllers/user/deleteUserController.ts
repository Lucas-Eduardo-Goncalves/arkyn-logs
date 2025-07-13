import { DeleteUserUseCase } from "../../../app/useCases/user/deleteUserUseCase";
import { RouteDTO } from "../../../main/types/RouteDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";
import { SchemaValidatorAdapter } from "../../adapters/schemaValidatorAdapter";
import { AuthMiddleware } from "../../../main/middlewares/authMiddleware";
import { deleteUserSchema } from "../../schemas/internal/user";

class DeleteUserController {
  constructor(private deleteUserUseCase: DeleteUserUseCase) {}

  async handle(route: RouteDTO) {
    try {
      await AuthMiddleware.authenticate(route);
      const userId = route.request.params?.userId;

      const schemaValidator = new SchemaValidatorAdapter(deleteUserSchema);
      const validatedBody = schemaValidator.validate({ userId });

      const user = await this.deleteUserUseCase.execute(validatedBody.userId);
      return route.response.json(user);
    } catch (error) {
      const errorHandlerAdapter = new ErrorHandlerAdapter();
      return errorHandlerAdapter.handle(error);
    }
  }
}

export { DeleteUserController };
