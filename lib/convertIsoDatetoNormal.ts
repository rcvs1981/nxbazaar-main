export function convertIsoDateToNormal(isoDate: string | undefined | null): string {
  if (!isoDate || typeof isoDate !== "string") {
    return "—"; // या कोई default fallback string
  }

  const dateObject = new Date(isoDate);

  if (isNaN(dateObject.getTime())) {
    return "—"; // या fallback
  }

  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const day = String(dateObject.getDate()).padStart(2, "0");

  return `${day}/${month}/${year}`;
}
