import { CreateRequestUseCase } from "../../../app/useCases/request/createRequestUseCase";
import { RouteDTO } from "../../../main/types/RouteDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";
import { SchemaValidatorAdapter } from "../../adapters/schemaValidatorAdapter";
import { AuthMiddleware } from "../../../main/middlewares/authMiddleware";
import { createRequestSchema } from "../../schemas/internal/request";

class CreateRequestController {
  constructor(private createRequestUseCase: CreateRequestUseCase) {}

  async handle(route: RouteDTO) {
    try {
      await AuthMiddleware.authenticate(route);

      const httpTrafficId = route.request.params?.httpTrafficId;
      const body = route.request.body;

      const schemaValidator = new SchemaValidatorAdapter(createRequestSchema);
      const data = schemaValidator.validate({ ...body, httpTrafficId });

      const request = await this.createRequestUseCase.execute(data);
      return route.response.json(request, 201);
    } catch (error) {
      const errorHandlerAdapter = new ErrorHandlerAdapter();
      return errorHandlerAdapter.handle(error);
    }
  }
}

export { CreateRequestController };
