// lib/apiRequest.ts
import toast from "react-hot-toast";

interface ApiRequestOptions<T> {
  setLoading: (value: boolean) => void;
  endpoint: string;
  data: T;
  resourceName: string;
  reset?: () => void;
  redirect?: () => void;
}

export async function makePostRequest<T>({
  setLoading,
  endpoint,
  data,
  resourceName,
  reset,
  redirect,
}: ApiRequestOptions<T>): Promise<void> {
  try {
    setLoading(true);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    const res = await fetch(`${baseUrl}/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const responseData = await res.json();

    if (res.ok) {
      toast.success(`New ${resourceName} created successfully.`);
      reset?.();
      redirect?.();
    } else {
      if (res.status === 409) {
        toast.error(responseData?.message || "Conflict Error");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  } catch (error) {
    console.error("POST Error:", error);
    toast.error("An unexpected error occurred.");
  } finally {
    setLoading(false);
  }
}

export async function makePutRequest<T>({
  setLoading,
  endpoint,
  data,
  resourceName,
  reset,
  redirect,
}: ApiRequestOptions<T>): Promise<void> {
  try {
    setLoading(true);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    const res = await fetch(`${baseUrl}/${endpoint}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const responseData = await res.json();

    if (res.ok) {
      toast.success(`${resourceName} updated successfully.`);
      reset?.();
      redirect?.();
    } else {
      toast.error(responseData?.message || "Something went wrong.");
    }
  } catch (error) {
    console.error("PUT Error:", error);
    toast.error("An unexpected error occurred.");
  } finally {
    setLoading(false);
  }
}
