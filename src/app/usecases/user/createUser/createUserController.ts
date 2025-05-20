import { Context } from "hono";
import { ErrorHandlerAdapter } from "../../../../infra/adapters/errorHandlerAdapter";
import { CreateUserUseCase } from "./createUserUseCase";

class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(context: Context) {
    try {
      const body = await context.req.json();
      const user = await this.createUserUseCase.execute(body);
      return context.json(user);
    } catch (error) {
      const errorHandlerAdapter = new ErrorHandlerAdapter();
      return errorHandlerAdapter.handle(error);
    }
  }
}

export { CreateUserController };
