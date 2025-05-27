import { RouteDTO } from "../../main/types/RouteDTO";
import { HttpAdapter } from "../adapters/httpAdapter";
import { JwtAdapter } from "../adapters/jwtAdapter";

class AuthMiddleware {
  static async authenticate(route: RouteDTO) {
    const token = route.request.headers?.authorization;

    const httpAdapter = new HttpAdapter();
    if (!token) throw httpAdapter.badRequest("No token provided");

    const jwtAdapter = new JwtAdapter();
    const { userId } = await jwtAdapter.verify(token);

    return { userId };
  }
}

export { AuthMiddleware };
