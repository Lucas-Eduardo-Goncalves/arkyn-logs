import { NotFound, ServerError } from "@arkyn/server";

class HttpAdapter {
  serverError(message: string, cause?: any) {
    throw new ServerError(message, cause);
  }

  notFound(message: string, cause?: any) {
    throw new NotFound(message, cause);
  }
}

export { HttpAdapter };
