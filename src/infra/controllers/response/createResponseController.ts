import { CreateResponseUseCase } from "../../../app/usecases/response/createResponseUseCase";
import { RouteDTO } from "../../../main/types/RouteDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";
import { SchemaValidatorAdapter } from "../../adapters/schemaValidatorAdapter";
import { AuthMiddleware } from "../../../main/middlewares/authMiddleware";
import { createResponseSchema } from "../../schemas/internal/response";

class CreateResponseController {
  constructor(private createResponseUseCase: CreateResponseUseCase) {}

  async handle(route: RouteDTO) {
    try {
      await AuthMiddleware.authenticate(route);

      const httpTrafficId = route.request.params?.httpTrafficId;
      const body = route.request.body;

      const schemaValidator = new SchemaValidatorAdapter(createResponseSchema);
      const data = schemaValidator.validate({ ...body, httpTrafficId });

      const response = await this.createResponseUseCase.execute(data);
      return route.response.json(response, 201);
    } catch (error) {
      const errorHandlerAdapter = new ErrorHandlerAdapter();
      return errorHandlerAdapter.handle(error);
    }
  }
}

export { CreateResponseController };
