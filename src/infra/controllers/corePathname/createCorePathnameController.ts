import { CreateCorePathnameUseCase } from "../../../app/usecases/corePathname/createCorePathnameUseCase";
import { RouteDTO } from "../../../main/types/RouteDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";
import { SchemaValidatorAdapter } from "../../adapters/schemaValidatorAdapter";
import { AuthMiddleware } from "../../../main/middlewares/authMiddleware";
import { createCorePathnameSchema } from "../../schemas/internal/corePathname";

class CreateCorePathnameController {
  constructor(private createCorePathnameUseCase: CreateCorePathnameUseCase) {}

  async handle(route: RouteDTO) {
    try {
      await AuthMiddleware.authenticate(route);

      const trafficSourceId = route.request.params?.trafficSourceId;
      const body = route.request.body;

      const schemaValidator = new SchemaValidatorAdapter(
        createCorePathnameSchema
      );

      const data = schemaValidator.validate({ ...body, trafficSourceId });
      const trafficsource = await this.createCorePathnameUseCase.execute(data);

      return route.response.json(trafficsource, 201);
    } catch (error) {
      const errorHandlerAdapter = new ErrorHandlerAdapter();
      return errorHandlerAdapter.handle(error);
    }
  }
}

export { CreateCorePathnameController };
