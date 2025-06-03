import { JsonValue } from "@prisma/client/runtime/library";

class JsonAdapter {
  jsonValueToStringRecord(jsonValue: JsonValue): Record<string, string> {
    if (
      !jsonValue ||
      typeof jsonValue !== "object" ||
      Array.isArray(jsonValue)
    ) {
      return {};
    }

    const result: Record<string, string> = {};

    for (const [key, value] of Object.entries(jsonValue)) {
      if (value !== null && value !== undefined) {
        result[key] = String(value);
      }
    }

    return result;
  }
}

export { JsonAdapter };
