import toast from "react-hot-toast";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

// POST Request with no-store cache
export async function makePostRequest<T>(
  setLoading: (value: boolean) => void,
  endpoint: string,
  data: T,
  resourceName: string,
  reset?: () => void,
  redirect?: () => void
): Promise<void> {
  try {
    setLoading(true);

    const response = await fetch(`${baseUrl}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (response.ok) {
      toast.success(`New ${resourceName} created successfully`);
      reset?.();
      redirect?.();
    } else {
      if (response.status === 409) {
        toast.error(responseData.message || "Conflict occurred");
      } else {
        toast.error("Something went wrong, please try again");
      }
    }
  } catch (error) {
    console.error("POST error:", error);
    toast.error("Unexpected error occurred");
  } finally {
    setLoading(false);
  }
}

// PUT Request with no-store cache
export async function makePutRequest<T>(
  setLoading: (value: boolean) => void,
  endpoint: string,
  data: T,
  resourceName: string,
  reset?: () => void,
  redirect?: () => void
): Promise<void> {
  try {
    setLoading(true);

    const response = await fetch(`${baseUrl}/${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
      body: JSON.stringify(data),
    });

    if (response.ok) {
      toast.success(`${resourceName} updated successfully`);
      reset?.();
      redirect?.();
    } else {
      const responseData = await response.json();
      toast.error(responseData?.message || "Something went wrong");
    }
  } catch (error) {
    console.error("PUT error:", error);
    toast.error("Unexpected error occurred");
  } finally {
    setLoading(false);
  }
}
