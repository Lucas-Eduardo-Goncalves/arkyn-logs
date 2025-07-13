import { SearchParamsMapper } from "../../../app/shared/searchParamsMapper";
import { ListUsersUseCase } from "../../../app/useCases/user/listUsersUseCase";
import { RouteDTO } from "../../../main/types/RouteDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";
import { AuthMiddleware } from "../../../main/middlewares/authMiddleware";
import { SchemaValidatorAdapter } from "../../adapters/schemaValidatorAdapter";
import { listUsersSchema } from "../../schemas/internal/user";

class ListUsersController {
  constructor(private listUsersUseCase: ListUsersUseCase) {}

  async handle(route: RouteDTO) {
    try {
      await AuthMiddleware.authenticate(route);

      const searchParams = SearchParamsMapper.toObject({
        query: route.request.query,
        params: route.request.params,
      });

      const schemaValidator = new SchemaValidatorAdapter(listUsersSchema);

      const validatedParams = schemaValidator.validate(searchParams);
      const mappedFilter = SearchParamsMapper.toFilter(validatedParams);

      const users = await this.listUsersUseCase.execute(mappedFilter);
      return route.response.json(users);
    } catch (error) {
      const errorHandlerAdapter = new ErrorHandlerAdapter();
      return errorHandlerAdapter.handle(error);
    }
  }
}

export { ListUsersController };
