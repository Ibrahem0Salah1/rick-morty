// lib/locations/filters.ts
import { createSearchParamsCache, parseAsInteger } from "nuqs/server"

export const locationsFiltersParsers = {
  page: parseAsInteger.withDefault(1).withOptions({
    clearOnDefault: true,
    scroll: false,
  }),
  location: parseAsInteger.withOptions({
    clearOnDefault: true,
    scroll: false,
  }), // no default → undefined when no sheet is open
}

export const locationsSearchParamsCache = createSearchParamsCache(locationsFiltersParsers)