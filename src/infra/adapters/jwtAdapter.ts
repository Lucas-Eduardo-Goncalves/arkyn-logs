import { jwtVerify, SignJWT } from "jose";

import { User } from "../../domain/entities/user";
import { environmentVariables } from "../../main/config/environmentVariables";
import { HttpAdapter } from "./httpAdapter";

class JwtAdapter {
  constructor() {}

  async verify(rawToken: string) {
    const httpAdapter = new HttpAdapter();

    try {
      const secret = new TextEncoder().encode(environmentVariables.JWT_KEY);
      const token = rawToken.replace("Bearer ", "");
      const { payload } = await jwtVerify(token, secret);
      const userId = payload?.id;

      if (typeof userId !== "string") {
        throw httpAdapter.unauthorized("Invalid token");
      }
      return { userId };
    } catch (error) {
      throw httpAdapter.unauthorized("Invalid token");
    }
  }

  async sign(user: User) {
    const alg = "HS256";
    const secret = new TextEncoder().encode(environmentVariables.JWT_KEY);
    const token = await new SignJWT({ id: user.id })
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setIssuer("urn:example:issuer")
      .setAudience("urn:example:audience")
      .setExpirationTime("1y")
      .sign(secret);

    return token;
  }
}

export { JwtAdapter };
