
import { format } from "date-fns";

export function formatDate(
  date: string | Date | undefined,
  fallback: string = "N/A",
  formatStr: string = "dd MMM yyyy"
): string {
  if (!date) return fallback;

  const parsedDate = typeof date === "string" ? new Date(date) : date;

  if (isNaN(parsedDate.getTime())) return fallback;

  return format(parsedDate, formatStr);
}
