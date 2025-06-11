import { UpdateUserUseCase } from "../../../app/usecases/user/updateUserUseCase";
import { RouteDTO } from "../../../main/types/RouteDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";
import { SchemaValidatorAdapter } from "../../adapters/schemaValidatorAdapter";
import { AuthMiddleware } from "../../../main/middlewares/authMiddleware";
import { updateUserSchema } from "../../schemas/internal/user";

class UpdateUserController {
  constructor(private updateUserUseCase: UpdateUserUseCase) {}

  async handle(route: RouteDTO) {
    try {
      await AuthMiddleware.authenticate(route);
      const body = route.request.body;
      const userId = route.request.params?.userId;

      const schemaValidator = new SchemaValidatorAdapter(updateUserSchema);
      const data = schemaValidator.validate({ ...body, userId });

      const user = await this.updateUserUseCase.execute(data);
      return route.response.json(user);
    } catch (error) {
      const errorHandlerAdapter = new ErrorHandlerAdapter();
      return errorHandlerAdapter.handle(error);
    }
  }
}

export { UpdateUserController };
