import { HttpAdapter } from "../../infra/adapters/httpAdapter";
import { JwtAdapter } from "../../infra/adapters/jwtAdapter";
import { RouteDTO } from "../../main/types/RouteDTO";

class AuthMiddleware {
  static async authenticate(route: RouteDTO) {
    const token = route?.request?.headers?.authorization;

    const httpAdapter = new HttpAdapter();
    if (!token) throw httpAdapter.badRequest("No token provided");

    const jwtAdapter = new JwtAdapter();
    const { userId } = await jwtAdapter.verify(token);

    return { userId };
  }
}

export { AuthMiddleware };
