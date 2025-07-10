{/** 
export async function getData<T>(endpoint: string): Promise<T> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await fetch(`${baseUrl}/api/${endpoint}`, {
      cache: "no-store",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch data");
  }
}
*/}
// lib/getData.ts

export async function getData<T>(endpoint: string): Promise<T> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    if (!baseUrl) {
      throw new Error("NEXT_PUBLIC_BASE_URL is not defined in .env file");
    }

    const res = await fetch(`${baseUrl}/api/${endpoint}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({}));
      throw new Error(
        `Failed to fetch /api/${endpoint}: ${res.status} ${res.statusText} ${
          errorBody?.message ? `- ${errorBody.message}` : ""
        }`
      );
    }

    const data = await res.json();
    return data as T;
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unknown fetch error";
    console.error("[getData error]:", message);
    throw new Error(message);
  }
}
