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


export async function getData<T>(endpoint: string): Promise<T[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${baseUrl}/api/${endpoint}`);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}


export async function getData(endpoint: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    // console.log(`${baseUrl}/api/${endpoint}`);
    const response = await fetch(`${baseUrl}/api/${endpoint}`, {
      cache: "no-store",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getData<T>(endpoint: string, options: RequestInit = {}): Promise<T | null> {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ??
      (process.env.NODE_ENV === "development" ? "http://localhost:3000" : "");

    if (!baseUrl) throw new Error("Base URL not set");

    const res = await fetch(`${baseUrl}/api/${endpoint}`, {
      cache: "no-store",
      ...options,
    });

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    return (await res.json()) as T;
  } catch (err) {
    console.error(`Error fetching ${endpoint}:`, err instanceof Error ? err.message : err);
    return null;
  }
}

 
export async function getData(endpoint: string) {
  // Ensure endpoint starts with /
  const normalizedEndpoint = endpoint.startsWith("/")
    ? endpoint
    : `/${endpoint}`;

  const baseUrl =
    typeof window === "undefined"
      ? process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
      : "";

  const url = normalizedEndpoint.startsWith("http")
    ? normalizedEndpoint
    : `${baseUrl}${normalizedEndpoint}`;

  const res = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  if (!res.ok) {
    console.error(`Error fetching ${url}: ${res.status} ${res.statusText}`);
    return null;
  }

  return res.json();
}
  */}
export async function getData(endpoint: string) {
  const url = endpoint.startsWith("http")
    ? endpoint
    : `http://localhost:3000/api/${endpoint.replace(/^\/+/, "")}`;

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    console.error(`Error fetching ${url}: ${res.status} ${res.statusText}`);
    return null;
  }

  return res.json();
}
