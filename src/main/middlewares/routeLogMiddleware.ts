import { Context, Next } from "hono";

class RouteLogMiddleware {
  private static getMethodColored(method: string): string {
    switch (method.toLowerCase()) {
      case "get":
        return "\x1b[32m GET\x1b[0m"; // Green
      case "post":
        return "\x1b[34mPOST\x1b[0m"; // Blue
      case "put":
        return "\x1b[33m PUT\x1b[0m"; // Yellow
      case "delete":
        return "\x1b[31mDELETE\x1b[0m"; // Red
      case "patch":
        return "\x1b[35mPATCH\x1b[0m"; // Magenta
      default:
        return method; // Default color for other methods
    }
  }

  static async logRoute(c: Context, next: Next) {
    const url = new URL(c.req.url).pathname;
    const method = c.req.method;

    console.log(`${this.getMethodColored(method)} => ${url}`);
    await next();
  }
}

export { RouteLogMiddleware };
