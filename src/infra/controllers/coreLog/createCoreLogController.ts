import { CreateCoreLogUseCase } from "../../../app/usecases/coreLog/createCoreLogUseCase";
import { AuthMiddleware } from "../../../main/middlewares/authMiddleware";
import { RouteDTO } from "../../../main/types/RouteDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";
import { SchemaValidatorAdapter } from "../../adapters/schemaValidatorAdapter";
import { createCoreLogSchema } from "../../schemas/internal/coreLog";

class CreateCoreLogController {
  constructor(private createCoreLogUseCase: CreateCoreLogUseCase) {}

  async handle(route: RouteDTO) {
    try {
      await AuthMiddleware.authenticate(route);

      const trafficSourceId = route.request.params?.trafficSourceId;
      const body = route.request.body;

      const schemaValidator = new SchemaValidatorAdapter(createCoreLogSchema);

      // const data = schemaValidator.validate({ ...body, trafficSourceId });
      // const trafficsource = await this.createCoreLogUseCase.execute(data);

      return route.response.json(null, 201);
    } catch (error) {
      const errorHandlerAdapter = new ErrorHandlerAdapter();
      return errorHandlerAdapter.handle(error);
    }
  }
}

export { CreateCoreLogController };
