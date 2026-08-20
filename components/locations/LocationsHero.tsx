// components/locations/LocationsHero.tsx
export function LocationsHero() {
  return (
    <section className="relative w-full overflow-hidden border-b border-white/10 bg-black py-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #fbdf00 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-4 text-center">
        <span className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-[#fbdf00]">
          Coordinates logged
        </span>
        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
          Every place, every dimension
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-zinc-400">
          Planets, dimensions, and everything in between — with a list of
          whoever&apos;s unlucky enough to live there.
        </p>
      </div>
    </section>
  )
}