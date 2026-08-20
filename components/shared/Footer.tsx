import Link from "next/link"
import Image from "next/image"
import { Logo } from "./Logo"
const NAV_LINKS = [
  { label: "Characters", href: "/characters" },
  { label: "Locations", href: "/locations" },
]

const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/Ibrahem0Salah1" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ibrahim-salah-94417921b/" },
  { label: "Resume", href: "https://drive.google.com/file/d/1p_uwUWExLbJYiFJXje9_-3dlAkI3zXxF/view?usp=sharing" },
]

export function Footer() {
  return (
    <footer className="relative w-full overflow-hidden border-t border-white/10 bg-black">
      {/* ambient glow behind the portal graphic */}
      <div className="pointer-events-none absolute -right-24 -top-24  w-[420px] rounded-full  sm:h-[500px] sm:w-[500px]" />

      <div className="relative mx-auto max-w-6xl px-4 py-16">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_auto]">
          {/* content */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div className="col-span-2 sm:col-span-1">
              <span className="font-display text-lg font-bold tracking-tight text-white">
                <Logo />
              </span>
              <p className="mt-3  text-sm leading-relaxed text-zinc-500">
                An unofficial explorer for every character, episode, and
                dimension in the show.
              </p>
            </div>

            <div>
              <h3 className="font-display text-xs font-semibold uppercase tracking-[0.15em] text-zinc-400">
                Explore
              </h3>
              <ul className="mt-4 space-y-2.5">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-400 transition-colors hover:text-[#fbdf00]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
  <h3 className="font-display text-xs font-semibold uppercase tracking-[0.15em] text-zinc-400">
    Connect
  </h3>
  <ul className="mt-4 space-y-2.5">
    {SOCIAL_LINKS.map((link) => (
      <li key={link.href}>
        <Link
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-zinc-400 transition-colors hover:text-[#fbdf00]"
        >
          {link.label}
        </Link>
      </li>
    ))}
  </ul>
</div>
          </div>

          {/* decorative portal graphic — desktop: bleeds off the right edge, mobile: small centered watermark */}
          <div className="mx-auto shrink-0 opacity-90 hidden lg:block lg:mx-0 lg:h-80 lg:w-56 lg:translate-x-8">
            <Image
                           src="/samples/ricknmorty.png"
                           alt="helloRick"
                           fill                           
                           className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                         />
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-14 flex flex-col items-center gap-3 border-t border-white/10 pt-6 text-xs text-zinc-500 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} @ibrahemsalah011@gmail.com</p>
          <p>Built with Next.js</p>
        </div>
      </div>
    </footer>
  )
}

