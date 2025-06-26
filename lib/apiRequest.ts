import toast from "react-hot-toast";

interface ApiRequestOptions<T> {
  setLoading: (value: boolean) => void;
  endpoint: string;
  data: T;
  resourceName: string;
  reset?: () => void;
  redirect?: () => void;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

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
    const response = await fetch(`${baseUrl}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (response.ok) {
      toast.success(`New ${resourceName} created successfully.`);
      reset?.();
      redirect?.();
    } else {
      if (response.status === 409 && responseData?.message) {
        toast.error(responseData.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  } catch (error) {
    console.error(error);
    toast.error("Unexpected error occurred.");
  } finally {
    setLoading(false);
  }
}

export async function makePutRequest<T>({
  setLoading,
  endpoint,
  data,
  resourceName,
  redirect,
  reset,
}: ApiRequestOptions<T>): Promise<void> {
  try {
    setLoading(true);
    const response = await fetch(`${baseUrl}/${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      toast.success(`${resourceName} updated successfully.`);
      reset?.();
      redirect?.();
    } else {
      toast.error("Something went wrong.");
    }
  } catch (error) {
    console.error(error);
    toast.error("Unexpected error occurred.");
  } finally {
    setLoading(false);
  }
}
