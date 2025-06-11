import { CreateDomainUseCase } from "../../../app/usecases/domain/createDomainUseCase";
import { RouteDTO } from "../../../main/types/RouteDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";
import { SchemaValidatorAdapter } from "../../adapters/schemaValidatorAdapter";
import { AuthMiddleware } from "../../../main/middlewares/authMiddleware";
import { createDomainSchema } from "../../schemas/internal/domain";

class CreateDomainController {
  constructor(private createDomainUseCase: CreateDomainUseCase) {}

  async handle(route: RouteDTO) {
    try {
      await AuthMiddleware.authenticate(route);
      const trafficSourceId = route.request.params?.trafficSourceId;
      const schemaValidator = new SchemaValidatorAdapter(createDomainSchema);

      const data = schemaValidator.validate({
        ...route.request.body,
        trafficSourceId,
      });

      const trafficsource = await this.createDomainUseCase.execute(data);
      return route.response.json(trafficsource, 201);
    } catch (error) {
      const errorHandlerAdapter = new ErrorHandlerAdapter();
      return errorHandlerAdapter.handle(error);
    }
  }
}

export { CreateDomainController };
