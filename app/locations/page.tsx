import { Suspense } from "react"
import { LocationsHero } from "@/components/locations/LocationsHero"
import { LocationsView } from "@/components/locations/LocationsList"
import { LocationsGridSkeleton } from "@/components/locations/LocationsGridSkeleton"
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