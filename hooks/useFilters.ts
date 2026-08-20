"use client";
import { useQueryStates } from "nuqs";
import { charactersfiltersParsers } from "@/lib/charcters/filters";
import { locationsFiltersParsers } from "@/lib/locations/filters"
export function useCharctersFilters() {
  return useQueryStates(charactersfiltersParsers, {});
}


export function useLocationsFilters () {
  return useQueryStates(locationsFiltersParsers, {});
}