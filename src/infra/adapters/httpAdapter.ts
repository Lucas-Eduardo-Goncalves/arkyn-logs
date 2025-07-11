import {
  BadRequest,
  Conflict,
  Forbidden,
  NotFound,
  ServerError,
  Unauthorized,
} from "@arkyn/server";

class HttpAdapter {
  badRequest(message: string, cause?: any) {
    throw new BadRequest(message, cause);
  }

  serverError(message: string, cause?: any) {
    throw new ServerError(message, cause);
  }

  notFound(message: string, cause?: any) {
    throw new NotFound(message, cause);
  }

  conflict(message: string, cause?: any) {
    throw new Conflict(message, cause);
  }

  unauthorized(message: string, cause?: any) {
    throw new Unauthorized(message, cause);
  }

  forbidden(message: string, cause?: any) {
    throw new Forbidden(message, cause);
  }
}

export { HttpAdapter };
