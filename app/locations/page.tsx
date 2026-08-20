// app/locations/page.tsx
import { Suspense } from "react"
import { LocationsHero } from "@/components/locations/LocationsHero"
import { LocationsView } from "@/components/locations/LocationsList"
import { LocationsGridSkeleton } from "@/components/locations/LocationsGridSkeleton"
// import { locationsSearchParamsCache } from "@/lib/locations/filters"
// import { fetchLocations } from "@/lib/locations/queries"

export default async function LocationsPage() {

  return (
    <>
      <LocationsHero />
      <Suspense fallback={<LocationsGridSkeleton/>}>
        <LocationsView />
      </Suspense>
    </>
  )
}