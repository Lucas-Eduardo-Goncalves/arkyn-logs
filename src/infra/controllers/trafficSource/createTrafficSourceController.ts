import { CreateTrafficSourceUseCase } from "../../../app/usecases/trafficSource/createTrafficSourceUseCase";
import { RouteDTO } from "../../../main/types/RouteDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";
import { SchemaValidatorAdapter } from "../../adapters/schemaValidatorAdapter";
import { AuthMiddleware } from "../../../main/middlewares/authMiddleware";
import { createTrafficSourceSchema } from "../../schemas/internal/trafficSource";

class CreateTrafficSourceController {
  constructor(private createTrafficSourceUseCase: CreateTrafficSourceUseCase) {}

  async handle(route: RouteDTO) {
    try {
      const { userId } = await AuthMiddleware.authenticate(route);

      const schemaValidator = new SchemaValidatorAdapter(
        createTrafficSourceSchema
      );

      const data = schemaValidator.validate({ ...route.request.body, userId });

      const trafficSource = await this.createTrafficSourceUseCase.execute(data);
      return route.response.json(trafficSource, 201);
    } catch (error) {
      const errorHandlerAdapter = new ErrorHandlerAdapter();
      return errorHandlerAdapter.handle(error);
    }
  }
}

export { CreateTrafficSourceController };
