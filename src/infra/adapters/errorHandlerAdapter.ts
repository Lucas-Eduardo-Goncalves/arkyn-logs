import { errorHandler } from "@arkyn/server";

class ErrorHandlerAdapter {
  handle(error: Error) {
    console.error(error);
    return errorHandler(error);
  }
}

export { ErrorHandlerAdapter };
