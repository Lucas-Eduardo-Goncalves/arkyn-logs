import { ListWebhookUseCase } from "../../../app/useCases/webhook/listWebhookUseCase";
import { AuthMiddleware } from "../../../main/middlewares/authMiddleware";
import { RouteDTO } from "../../../main/types/RouteDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";
import { SchemaValidatorAdapter } from "../../adapters/schemaValidatorAdapter";
import { listWebhookSchema } from "../../schemas/internal/webhook";

class ListWebhookController {
  constructor(private listWebhookUseCase: ListWebhookUseCase) {}

  async handle(route: RouteDTO) {
    try {
      console.log("ListWebhookController.handle called");

      const { userId } = await AuthMiddleware.authenticate(route);

      const schemaValidator = new SchemaValidatorAdapter(listWebhookSchema);
      const data = schemaValidator.validate({ ...route.request.params });

      const webhook = await this.listWebhookUseCase.execute(data, userId);

      return route.response.json(webhook, 201);
    } catch (error) {
      const errorHandlerAdapter = new ErrorHandlerAdapter();
      return errorHandlerAdapter.handle(error);
    }
  }
}

export { ListWebhookController };
