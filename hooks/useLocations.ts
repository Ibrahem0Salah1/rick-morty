"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchLocations } from "@/lib/locations/queries";
import { LocationsResult } from "@/lib/types";

export function useInfiniteLocations () {
    return useInfiniteQuery({
        queryKey: ["locations", "infinite"],
        queryFn: ({pageParam}) => fetchLocations({page : pageParam}),
        initialPageParam: 1,
        getNextPageParam : (lastPage : LocationsResult) => {
            return lastPage.locations.info.next ?? undefined
        }
    })
}