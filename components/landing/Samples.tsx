// components/home/Samples.tsx
"use client"

import Image from "next/image"
import { motion } from "framer-motion"

const SAMPLE_IMAGES = [
  { src: "/samples/sample1.jpg", alt: "Rick and Morty in the garage" },
  { src: "/samples/sample2.jpg", alt: "Portal opening in the backyard" },
  { src: "/samples/sample3.jpg", alt: "Rick tinkering with the portal gun" },
  { src: "/samples/sample4.jpg", alt: "Morty running through a portal" },
  { src: "/samples/sample5.jpg", alt: "The Smith family living room" },
  { src: "/samples/sample6.jpg", alt: "Rick and Morty in an alien landscape" },
  { src: "/samples/sample7.jpg", alt: "Rick and Morty" },
  { src: "/samples/sample8.jpg", alt: "Rick and Morty in" },
]

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0 },
}

export function Samples() {
  return (
    <section className="w-full bg-black py-20">
      <div className="px-4 md:px-14 py-12">
        {/* intro */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          variants={fadeUp}
          className="mb-10 max-w-2xl"
        >
          <span className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-[#fbdf00]">
            From the multiverse
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            A glimpse across dimensions
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-400">
            A few frames pulled from the show — Rick&apos;s garage, portal jumps
            gone sideways, and the ordinary Smith household caught in the
            middle of it all. Every dimension looks a little different, but
            it&apos;s always the same two idiots at the center of it.
          </p>
        </motion.div>

        {/* video */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          variants={fadeUp}
          className="mb-4 overflow-hidden rounded-lg border border-white/10"
        >
          <video
            className="aspect-video w-full object-cover"
            src="https://s3.us-west-1.wasabisys.com/bardel-public-ahb5how/Demo_Reel/RAM8_10sec_Clip.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        </motion.div>

        {/* image grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.12 }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {SAMPLE_IMAGES.map((img) => (
            <motion.div
              key={img.src}
              variants={fadeUp}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="group relative aspect-4/3 overflow-hidden rounded-lg border border-white/10 bg-black/40"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}