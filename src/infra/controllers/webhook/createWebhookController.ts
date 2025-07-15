import { CreateWebhookUseCase } from "../../../app/useCases/webhook/createWebhookUseCase";
import { AuthMiddleware } from "../../../main/middlewares/authMiddleware";
import { RouteDTO } from "../../../main/types/RouteDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";
import { SchemaValidatorAdapter } from "../../adapters/schemaValidatorAdapter";
import { createWebhookSchema } from "../../schemas/internal/webhook";

class CreateWebhookController {
  constructor(private createWebhookUseCase: CreateWebhookUseCase) {}

  async handle(route: RouteDTO) {
    try {
      const { userId } = await AuthMiddleware.authenticate(route);

      const body = route.request.body;

      const schemaValidator = new SchemaValidatorAdapter(createWebhookSchema);
      const data = schemaValidator.validate(body);

      const webhook = await this.createWebhookUseCase.execute(data, userId);

      return route.response.json(webhook, 201);
    } catch (error) {
      const errorHandlerAdapter = new ErrorHandlerAdapter();
      return errorHandlerAdapter.handle(error);
    }
  }
}

export { CreateWebhookController };
