import { hash as argonHash, verify as argonVerify } from "argon2";
import { HttpAdapter } from "./httpAdapter";

class PasswordAdapter {
  constructor() {}

  async hash(password: string) {
    const passwordHash = await argonHash(password);
    return passwordHash;
  }

  async verify(hash: string, password: string) {
    const httpAdapter = new HttpAdapter();
    const match = await argonVerify(hash, password);
    if (!match) throw httpAdapter.badRequest("Invalid password");
  }
}

export { PasswordAdapter };
