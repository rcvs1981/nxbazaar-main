
export function convertIsoDateToNormal(isoDate: string): string {
  const dateObject = new Date(isoDate);
  if (isNaN(dateObject.getTime())) {
    throw new Error("Invalid ISO date string");
  }

  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const day = String(dateObject.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
