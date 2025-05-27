import crypto from "crypto";

class HashService {
  static hashString(input: string): string {
    const hash = crypto.createHash("sha256").update(input).digest("hex");
    return hash;
  }
}

export { HashService };
