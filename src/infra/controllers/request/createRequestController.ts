import { CreateRequestUseCase } from "../../../app/usecases/request/createRequestUseCase";
import { RouteDTO } from "../../../main/types/RouteDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";
import { SchemaValidatorAdapter } from "../../adapters/schemaValidatorAdapter";
import { AuthMiddleware } from "../../middlewares/authMiddleware";
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

      const trafficsource = await this.createRequestUseCase.execute(data);
      return route.response.json(trafficsource, 201);
    } catch (error) {
      const errorHandlerAdapter = new ErrorHandlerAdapter();
      return errorHandlerAdapter.handle(error);
    }
  }
}

export { CreateRequestController };
