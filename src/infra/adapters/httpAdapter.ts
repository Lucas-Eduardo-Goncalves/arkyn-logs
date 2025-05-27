import {
  NotFound,
  ServerError,
  Conflict,
  Unauthorized,
  BadRequest,
} from "@arkyn/server";

class HttpAdapter {
  badRequest(message: string, cause?: any) {
    new BadRequest(message, cause);
  }
  serverError(message: string, cause?: any) {
    new ServerError(message, cause);
  }

  notFound(message: string, cause?: any) {
    new NotFound(message, cause);
  }

  conflict(message: string, cause?: any) {
    new Conflict(message, cause);
  }

  unauthorized(message: string, cause?: any) {
    new Unauthorized(message, cause);
  }
}

export { HttpAdapter };
