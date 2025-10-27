import { AuthUserUseCase } from "../../../app/useCases/user/authUserUseCase";
import { RouteDTO } from "../../../main/types/RouteDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";
import { SchemaValidatorAdapter } from "../../adapters/schemaValidatorAdapter";
import { authUserSchema } from "../../schemas/internal/user";

class AuthUserController {
  constructor(private authUserUseCase: AuthUserUseCase) {}

  async handle(route: RouteDTO) {
    try {
      const body = route.request.body;

      const schemaValidator = new SchemaValidatorAdapter(authUserSchema);
      const data = schemaValidator.validate(body);

      const user = await this.authUserUseCase.execute(data);
      return route.response.json(user, 201);
    } catch (error) {
      return ErrorHandlerAdapter.handle(error);
    }
  }
}

export { AuthUserController };
