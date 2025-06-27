/**
 * Converts an ISO date string to a normalized date string in YYYY-MM-DD format
 * @param isoDate - The ISO date string to convert
 * @returns Normalized date string in YYYY-MM-DD format, or empty string if invalid input
 */
export function convertIsoDateToNormal(isoDate: string | Date | undefined | null): string {
  // Handle null/undefined/empty input
  if (!isoDate) return '';
  
  try {
    const dateObject = new Date(isoDate);
    
    // Check if the date is valid
    if (isNaN(dateObject.getTime())) {
      console.warn('Invalid date provided to convertIsoDateToNormal:', isoDate);
      return '';
    }
    
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(dateObject.getDate()).padStart(2, "0");
    
    return `${year}-${month}-${day}`;
  } catch (error) {
    console.error('Error converting ISO date:', error);
    return '';
  }
}