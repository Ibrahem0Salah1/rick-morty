import Hero from "@/components/landing/Hero"

import { Characters } from "@/components/landing/Characters";
import { Samples } from "@/components/landing/Samples";
import { Footer } from "@/components/landing/Footer";


export default async function Home() {
  
  return (
    <>
    <Hero/>
    <Characters/>
    <Samples/>
    <Footer/>
    </>
  )
}
