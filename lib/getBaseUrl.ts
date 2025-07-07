// utils/getBaseUrl.ts

export function getBaseUrl() {
  if (typeof window !== "undefined") {
    // Client-side: relative path OK
    return "";
  }

  // Server-side: absolute path जरूरी
  const base =
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.BASE_URL || // fallback
    "http://localhost:3000";

  return base;
}
console.log("Base URL:", getBaseUrl());