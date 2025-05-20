import { NotFound, ServerError, Conflict } from "@arkyn/server";

class HttpAdapter {
  serverError(message: string, cause?: any) {
    throw new ServerError(message, cause);
  }

  notFound(message: string, cause?: any) {
    throw new NotFound(message, cause);
  }

  conflict(message: string, cause?: any) {
    throw new Conflict(message, cause);
  }
}

export { HttpAdapter };
