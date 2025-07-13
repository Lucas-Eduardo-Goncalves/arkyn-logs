import { ComposeHttpTrafficRecordUseCase } from "../../../app/useCases/httpTrafficRecord/composeHttpTrafficRecordUseCase";
import { RouteDTO } from "../../../main/types/RouteDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";
import { HttpAdapter } from "../../adapters/httpAdapter";
import { SchemaValidatorAdapter } from "../../adapters/schemaValidatorAdapter";
import { AuthMiddleware } from "../../../main/middlewares/authMiddleware";
import { composeHttpTrafficRecordSchema } from "../../schemas/internal/httpTrafficRecord";

class ComposeHttpTrafficRecordController {
  constructor(
    private composeHttpTrafficRecordUseCase: ComposeHttpTrafficRecordUseCase
  ) {}

  async handle(route: RouteDTO) {
    try {
      const { userId } = await AuthMiddleware.authenticate(route);
      const body = route.request.body;
      const trafficSourceId = route.request.params?.trafficSourceId;

      if (!trafficSourceId) {
        const httpAdapter = new HttpAdapter();
        const message = "Traffic source ID is required to list httpTraffics.";
        throw httpAdapter.notFound(message);
      }

      const schemaValidator = new SchemaValidatorAdapter(
        composeHttpTrafficRecordSchema
      );

      const data = schemaValidator.validate({ ...body, trafficSourceId });
      await this.composeHttpTrafficRecordUseCase.execute(data, userId);

      return route.response.json(null, 201);
    } catch (error) {
      const errorHandlerAdapter = new ErrorHandlerAdapter();
      console.log(error);
      return errorHandlerAdapter.handle(error);
    }
  }
}

export { ComposeHttpTrafficRecordController };
