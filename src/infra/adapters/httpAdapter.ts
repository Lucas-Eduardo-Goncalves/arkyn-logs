import { ServerError } from "@arkyn/server";

class HttpAdapter {
  serverError(message: string, cause?: any) {
    throw new ServerError(message, cause);
  }
}

export { HttpAdapter };
