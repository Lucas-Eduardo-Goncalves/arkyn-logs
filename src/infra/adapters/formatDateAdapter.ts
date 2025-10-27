import { formatDate } from "@arkyn/shared";

class FormatDateAdapter {
  static format(date: Date): string {
    return formatDate(
      date.toISOString().split("T"),
      "isoDate",
      "MM/DD/YYYY at hh:mm:ss"
    );
  }

  static formatToCustomType(date: Date, format: string): string {
    return formatDate(date.toISOString().split("T"), "isoDate", format);
  }
}

export { FormatDateAdapter };
