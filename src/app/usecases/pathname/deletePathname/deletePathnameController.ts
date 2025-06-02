import { ErrorHandlerAdapter } from "../../../../infra/adapters/errorHandlerAdapter";
import { AuthMiddleware } from "../../../../infra/middlewares/authMiddleware";
import { RouteDTO } from "../../../../main/types/RouteDTO";
import { DeletePathnameUseCase } from "./deletePathnameUseCase";

class DeletePathnameController {
  constructor(private deletePathnameUseCase: DeletePathnameUseCase) {}

  async handle(route: RouteDTO) {
    try {
      await AuthMiddleware.authenticate(route);
      const pathnameId = route.request.params?.pathnameId;

      const trafficsource = await this.deletePathnameUseCase.execute({
        pathnameId,
      });

      return route.response.json(trafficsource);
    } catch (error) {
      const errorHandlerAdapter = new ErrorHandlerAdapter();
      return errorHandlerAdapter.handle(error);
    }
  }
}

export { DeletePathnameController };
