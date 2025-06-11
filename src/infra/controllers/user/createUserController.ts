import { CreateUserUseCase } from "../../../app/usecases/user/createUserUseCase";
import { RouteDTO } from "../../../main/types/RouteDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";
import { SchemaValidatorAdapter } from "../../adapters/schemaValidatorAdapter";
import { AuthMiddleware } from "../../../main/middlewares/authMiddleware";
import { createUserSchema } from "../../schemas/internal/user";

class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(route: RouteDTO) {
    try {
      await AuthMiddleware.authenticate(route);
      const body = route.request.body;

      const schemaValidator = new SchemaValidatorAdapter(createUserSchema);
      const data = schemaValidator.validate(body);

      const user = await this.createUserUseCase.execute(data);
      return route.response.json(user, 201);
    } catch (error) {
      const errorHandlerAdapter = new ErrorHandlerAdapter();
      return errorHandlerAdapter.handle(error);
    }
  }
}

export { CreateUserController };
