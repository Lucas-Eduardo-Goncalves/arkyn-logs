import { errorHandler } from "@arkyn/server";

class ErrorHandlerAdapter {
  handle(error: any) {
    return errorHandler(error);
  }
}

export { ErrorHandlerAdapter };
