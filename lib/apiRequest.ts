import toast from "react-hot-toast";

export async function makePostRequest<T>(
  setLoading: (val: boolean) => void,
  endpoint: string,
  data: T,
  resourceName: string,
  reset?: () => void,
  redirect?: () => void
) {
  setLoading(true);
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

   if (!res.ok) {
  const errorText = await res.text();
  toast.error(errorText || `Failed to create ${resourceName}`);
  throw new Error(errorText);
}

    toast.success(`${resourceName} created successfully`);
    reset?.();
    redirect?.();
  } catch (error) {
    console.error(error);
    toast.error(`Error creating ${resourceName}`);
  } finally {
    setLoading(false);
  }
}

export async function makePutRequest<T>(
  setLoading: (val: boolean) => void,
  endpoint: string,
  data: T,
  resourceName: string,
  redirect?: () => void
) {
  setLoading(true);
  try {
    const res = await fetch(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) throw new Error(`Failed to update ${resourceName}`);

    toast.success(`${resourceName} updated successfully`);
    redirect?.();
  } catch (error) {
    console.error(error);
    toast.error(`Error updating ${resourceName}`);
  } finally {
    setLoading(false);
  }
}
