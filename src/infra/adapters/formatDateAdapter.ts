import { formatDate } from "@arkyn/shared";

class FormatDateAdapter {
  format(date: Date): string {
    return formatDate(
      date.toISOString().split("T"),
      "isoDate",
      "MM/DD/YYYY at hh:mm:ss"
    );
  }
}

export { FormatDateAdapter };
