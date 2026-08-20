import Hero from "@/components/landing/Hero"
import { Characters } from "@/components/landing/Characters";
import { Samples } from "@/components/landing/Samples";

export default async function Home() {
  
  return (
    <>
    <Hero/>
    <Characters/>
    <Samples/>
    </>
  )
}
