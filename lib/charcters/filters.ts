import {
    createSearchParamsCache,
    inferParserType,
    parseAsInteger,
    parseAsString,
    parseAsStringEnum,
} from "nuqs/server"

export const charactersfiltersParsers = {
    q: parseAsString.withDefault("").withOptions({
    clearOnDefault: true,
    scroll: true,
  }),
  page: parseAsInteger.withDefault(1).withOptions({
    clearOnDefault : true,
    scroll: true
  }),
  status: parseAsStringEnum([
    "All",
    "Alive",
    "Dead",
    "unknown"
  ]).withDefault("All"),
}

export const searchParamsCache = createSearchParamsCache(charactersfiltersParsers);

export type CharctersFilters = inferParserType<typeof charactersfiltersParsers>;