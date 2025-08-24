import {  ApiFarmer } from "@/types/ApiFarmer";
import { Farmer } from "@/types/Farmer";

/**
 * Converts API farmer objects to the Farmer type expected by NewProductForm
 * @param apiFarmers - Array of ApiFarmer fetched from the API
 * @returns Farmer[] - Array of Farmer objects with required `title` field
 */
export function mapFarmers(apiFarmers: ApiFarmer[]): Farmer[] {
  return apiFarmers.map(f => ({
    id: f.id,
    title: f.name?.trim() || "Unnamed", // fallback if name is null or empty
  }));
}