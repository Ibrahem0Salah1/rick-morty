"use client"

import { useReducedMotion, motion } from "framer-motion"
import dynamic from "next/dynamic"
import Link from "next/link"
import { cn } from "@/lib/utils"
const DotLottieReact = dynamic(
  () => import("@lottiefiles/dotlottie-react").then((mod) => mod.DotLottieReact),
  { ssr: false }
)

export default function Hero() {
  const reduced = useReducedMotion()

  return (
    <section className="relative px-12 min-h-screen flex items-center overflow-hidden">
      <div className="grid 
      
      w-full grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center   mx-auto px-4 py-24">
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-6">
          <h1 className="font-display text-5xl md:text-6xl lg:text-8xl font-bold text-foreground leading-tight tracking-tight">
            Wubba Lubba
            <br />
            <span className="text-primary">Dub Dub</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-md leading-relaxed">
            Explore every character, episode, and location across infinite
            universes. The multiverse is yours to discover.
          </p>
          <div className="flex items-center justify-between gap-5">
            <Link
            href="/characters"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-accent-foreground transition-all hover:brightness-110 active:scale-[0.97]"
          >
            Explore Characters
          </Link>
           <Link
        href="/characters"
         className={cn(
              "truncate font-display text-base font-semibold tracking-tight text-white transition-colors duration-200",
              "hover:text-[#fbdf00]"
            )}
      >
        <span className="flex  gap-2 w-fit bg-[linear-gradient(#fbdf00,#fbdf00)] bg-[length:0%_1px] bg-bottom-left bg-no-repeat pb-0.5 transition-[background-size] duration-300 ease-out hover:bg-[length:100%_1px]">
            Explore more characters
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </span>
        
      </Link>
          </div>
          
        </div>

        <div className="flex items-center justify-center">
          <motion.div
            className="w-full max-w-md aspect-square"
            animate={reduced ? {} : { y: [0, -12, 0] }}
            transition={
              reduced
                ? undefined
                : { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }
          >
            <DotLottieReact
              src="/rick.json"
              loop
              autoplay
              style={{ width: "100%", height: "100%" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
