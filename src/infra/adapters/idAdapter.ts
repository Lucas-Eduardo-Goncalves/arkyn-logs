import { generateId } from "@arkyn/shared";

class IdAdapter {
  static generate(): string {
    return generateId("text", "v7");
  }
}

export { IdAdapter };
