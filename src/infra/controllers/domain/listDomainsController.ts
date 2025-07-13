import { SearchParamsMapper } from "../../../app/shared/searchParamsMapper";
import { ListDomainsUseCase } from "../../../app/useCases/domain/listDomainsUseCase";
import { AuthMiddleware } from "../../../main/middlewares/authMiddleware";
import { RouteDTO } from "../../../main/types/RouteDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";
import { SchemaValidatorAdapter } from "../../adapters/schemaValidatorAdapter";
import { listDomainsSchema } from "../../schemas/internal/domain";

class ListDomainsController {
  constructor(private listDomainsUseCase: ListDomainsUseCase) {}

  async handle(route: RouteDTO) {
    try {
      const { userId } = await AuthMiddleware.authenticate(route);

      const searchParams = SearchParamsMapper.toObject({
        query: route.request.query,
        params: route.request.params,
      });

      const schemaValidator = new SchemaValidatorAdapter(listDomainsSchema);

      const validatedParams = schemaValidator.validate(searchParams);
      const mappedFilter = SearchParamsMapper.toFilter(validatedParams);

      const domains = await this.listDomainsUseCase.execute(
        mappedFilter,
        userId
      );

      return route.response.json(domains);
    } catch (error) {
      const errorHandlerAdapter = new ErrorHandlerAdapter();
      return errorHandlerAdapter.handle(error);
    }
  }
}

export { ListDomainsController };
