
export const generateCouponCode = (
  title: string = "",
  expiryDate: string = ""
): string => {
  // Format the title to uppercase and remove spaces
  const formattedTitle = title.toUpperCase().replace(/\s+/g, "");

  // Format the expiry date to "DDMMYYYY" (handles both "YYYY-MM-DD" and "DD-MM-YYYY")
  const dateParts = expiryDate.includes("-") ? expiryDate.split("-") : [];
  const formattedExpiryDate = dateParts.length === 3
    ? expiryDate.includes("20") // Simple check for YYYY-MM-DD format
      ? `${dateParts[2]}${dateParts[1]}${dateParts[0]}` // DDMMYYYY
      : `${dateParts[0]}${dateParts[1]}${dateParts[2]}` // Already DD-MM-YYYY
    : "";

  // Combine the formatted title and expiry date to create the coupon code
  return formattedTitle && formattedExpiryDate
    ? `${formattedTitle}-${formattedExpiryDate}`
    : formattedTitle || ""; // Fallback if no title/date provided
};