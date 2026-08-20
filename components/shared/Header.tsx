// components/shared/Header.tsx
"use client"

import { useState, useEffect, useRef } from "react"
import { motion, type Variants } from "framer-motion"
import { Logo } from "@/components/shared/Logo"
import { HamburgerButton } from "@/components/shared/HamburgerButton"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import Link from "next/link"
const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Characters", href: "/characters" },
  { label: "Locations", href: "/locations" },
]

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 120, damping: 18 },
  },
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div ref={sentinelRef} className="absolute left-0 top-0 h-px w-full" />

      <header
        className={cn(
          "fixed left-0 top-0 z-50 w-full transition-colors duration-300",
          scrolled ? "bg-background/80 backdrop-blur-sm" : "bg-transparent"
        )}
      >
        <div className="flex items-center justify-between px-4 py-3 md:px-14 md:py-4">
          <Logo />
          <HamburgerButton className="cursor-pointer" isOpen={open} onClick={() => setOpen((o) => !o)} />
        </div>
      </header>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          className="w-full border-l-0 bg-background p-0 shadow-2xl sm:max-w-lg [&>button]:hidden">
          {/* Radix requires an accessible title for the dialog; visually hidden since
              the hamburger button below already communicates "close" */}
          <SheetTitle className="sr-only">Navigation menu</SheetTitle>

          <div className="flex items-center justify-end px-4 py-3 md:px-14 md:py-6">
            <HamburgerButton isOpen={open} onClick={() => setOpen(false)} />
          </div>

          <motion.ul
            className="flex flex-col gap-2 px-6 pt-8"
            variants={listVariants}
            initial="hidden"
            animate={open ? "visible" : "hidden"}
          >
            {NAV_LINKS.map((link) => (
              <motion.li key={link.href} variants={itemVariants}>
                  <Link  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 font-display text-4xl font-bold text-foreground transition-colors hover:text-accent md:text-5xl">
                      {link.label}
                  </Link>
                 
                
                
                
              </motion.li>
            ))}
          </motion.ul>
        </SheetContent>
      </Sheet>
    </>
  )
}