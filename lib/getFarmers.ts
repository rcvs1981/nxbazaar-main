import { ApiFarmer } from "@/types/ApiFarmer";

export async function getFarmers(): Promise<ApiFarmer[]> {
  const res = await fetch("/api/farmers");
  if (!res.ok) throw new Error("Failed to fetch farmers");

  const data: ApiFarmer[] = await res.json();
  return data || [];
}