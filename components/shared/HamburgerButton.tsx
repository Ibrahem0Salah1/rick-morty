"use client"

import { motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

interface HamburgerButtonProps {
  isOpen: boolean
  onClick: () => void
  className?: string
}

const SPRING = { type: "spring" as const, stiffness: 260, damping: 20 }

export function HamburgerButton({ isOpen, onClick, className }: HamburgerButtonProps) {
  const reduced = useReducedMotion()

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg transition-colors ",
        className
      )}
      aria-expanded={isOpen}
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      <span className="flex flex-col items-center justify-center gap-[5px]">
        <motion.span
          aria-hidden
          className="block h-[1.2px] w-5 rounded-full bg-current"
          animate={
            reduced
              ? { rotate: isOpen ? 45 : 0, y: isOpen ? 5 : 0 }
              : { rotate: isOpen ? 45 : 0, y: isOpen ? 5 : 0 }
          }
          transition={reduced ? { duration: 0 } : SPRING}
          style={{ willChange: "transform" }}
        />
        <motion.span
          aria-hidden
          className="block h-[1.2px]  rounded-full bg-current"
          animate={
            reduced
              ? { rotate: isOpen ? -45 : 0, y: isOpen ? -5 : 0, width: isOpen ? 20 : 14 }
              : { rotate: isOpen ? -45 : 0, y: isOpen ? -5 : 0, width: isOpen ? 20 : 14 }
          }
          transition={reduced ? { duration: 0 } : SPRING}
          style={{ willChange: "transform, width" }}
        />
      </span>
    </button>
  )
}
