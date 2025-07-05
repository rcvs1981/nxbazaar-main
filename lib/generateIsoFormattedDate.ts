export function generateIsoFormattedDate(normalDate: string | Date): string {
  // Convert to Date if input is a string
  const dateObject = typeof normalDate === "string" ? new Date(normalDate) : normalDate;

  if (isNaN(dateObject.getTime())) {
    throw new Error("Invalid date format provided.");
  }

  return dateObject.toISOString();
}
