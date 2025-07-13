import { UpdateWebhookUseCase } from "../../../app/useCases/webhook/updateWebhookUseCase";
import { AuthMiddleware } from "../../../main/middlewares/authMiddleware";
import { RouteDTO } from "../../../main/types/RouteDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";
import { SchemaValidatorAdapter } from "../../adapters/schemaValidatorAdapter";
import { updateWebhookSchema } from "../../schemas/internal/webhook";

class UpdateWebhookController {
  constructor(private updateWebhookUseCase: UpdateWebhookUseCase) {}

  async handle(route: RouteDTO) {
    try {
      const { userId } = await AuthMiddleware.authenticate(route);

      const trafficSourceId = route.request.params?.trafficSourceId;
      const body = route.request.body;

      const schemaValidator = new SchemaValidatorAdapter(updateWebhookSchema);
      const data = schemaValidator.validate({ ...body, trafficSourceId });

      const webhook = await this.updateWebhookUseCase.execute(data, userId);

      return route.response.json(webhook, 201);
    } catch (error) {
      const errorHandlerAdapter = new ErrorHandlerAdapter();
      return errorHandlerAdapter.handle(error);
    }
  }
}

export { UpdateWebhookController };
