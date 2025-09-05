export function generateUserCode(prefix: string, fullName: string): string {
  // Extract initials from the full name
  const initials: string = fullName
    .trim()
    .split(/\s+/) // handles multiple spaces
    .map((name) => name[0]?.toUpperCase() ?? "")
    .join("");

  // Generate a timestamp-based code
  const now: Date = new Date();
  const timestampCode: string = `${now.getFullYear()}${(now.getMonth() + 1)
    .toString()
    .padStart(2, "0")}${now.getDate().toString().padStart(2, "0")}${now
    .getHours()
    .toString()
    .padStart(2, "0")}${now.getMinutes().toString().padStart(2, "0")}${now
    .getSeconds()
    .toString()
    .padStart(2, "0")}`;

  // Combine prefix, initials, and timestamp code to form the unique user code
  const userCode: string = `${prefix}-${initials}-${timestampCode}`;

  return userCode;
}
