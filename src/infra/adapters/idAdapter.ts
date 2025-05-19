import { generateId } from "@arkyn/shared";

class IdAdapter {
  generate(): string {
    return generateId("text", "v7");
  }
}

export { IdAdapter };
