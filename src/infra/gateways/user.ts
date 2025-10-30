import { UserGatewayDTO } from "../../domain/gateways/user";
import { HttpAdapter } from "../adapters/httpAdapter";
import { microAuth } from "../https/microAuth";

class UserGateway implements UserGatewayDTO {
  async validateUserId(userId: string): Promise<boolean> {
    const apiResponse = await microAuth.post(`/users/${userId}/valid`, {});

    if (!apiResponse.success) {
      throw HttpAdapter.badRequest(apiResponse.message, apiResponse.cause);
    }

    const isValidUserId = apiResponse.response?.isValid === true;
    return isValidUserId;
  }
}

export { UserGateway };
