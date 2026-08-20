"use client"
import { useRef, useCallback, useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { CharacterCard } from "@/components/characters/CharacterCard"
import { Character } from "@/lib/types/index"

interface CharactersSliderProps {
  characters: Character[]
}

export function CharactersSlider({ characters }: CharactersSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1)

  const CARD_WIDTH = "w-48 sm:w-56 lg:w-64"

  const calculatePages = useCallback(() => {
    const scrollEl = scrollRef.current
    const containerEl = containerRef.current
    if (!scrollEl || !containerEl) return

    const firstCard = scrollEl.firstElementChild as HTMLElement | null
    if (!firstCard) return

    const containerWidth = containerEl.clientWidth
    const cardWidth = firstCard.offsetWidth
    const gap = 16
    const cardsPerView = Math.max(1, Math.floor(containerWidth / (cardWidth + gap)))
    const pages = Math.max(1, Math.ceil(characters.length / cardsPerView))

    setTotalPages(pages)

    const maxScroll = scrollEl.scrollWidth - containerWidth
    if (maxScroll <= 0) {
      setPage(0)
      return
    }
    const pageWidth = cardsPerView * (cardWidth + gap)
    const currentPage = Math.round(scrollEl.scrollLeft / pageWidth)
    setPage(Math.min(currentPage, pages - 1))
  }, [characters.length])

  useEffect(() => {
    calculatePages()

    const ro = new ResizeObserver(calculatePages)
    if (containerRef.current) ro.observe(containerRef.current)
    window.addEventListener("resize", calculatePages)

    return () => {
      ro.disconnect()
      window.removeEventListener("resize", calculatePages)
    }
  }, [calculatePages])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onScroll = () => calculatePages()
    el.addEventListener("scroll", onScroll, { passive: true })
    return () => el.removeEventListener("scroll", onScroll)
  }, [calculatePages])

  const scrollToPage = useCallback((pageIndex: number) => {
    const scrollEl = scrollRef.current
    const containerEl = containerRef.current
    if (!scrollEl || !containerEl) return

    const firstCard = scrollEl.firstElementChild as HTMLElement | null
    if (!firstCard) return

    const cardWidth = firstCard.offsetWidth
    const gap = 16
    const containerWidth = containerEl.clientWidth
    const cardsPerView = Math.max(1, Math.floor(containerWidth / (cardWidth + gap)))

    const targetScroll = pageIndex * cardsPerView * (cardWidth + gap)
    scrollEl.scrollTo({ left: targetScroll, behavior: "smooth" })
  }, [])

  const scroll = useCallback(
    (dir: "left" | "right") => {
      const next =
        dir === "left"
          ? Math.max(0, page - 1)
          : Math.min(totalPages - 1, page + 1)
      scrollToPage(next)
    },
    [page, totalPages, scrollToPage]
  )

  if (characters.length === 0) return null

  return (
    <div ref={containerRef} className="relative group/slider">
      {/* Scroll track */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 pt-1 px-1 -mx-1"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {characters.map((character, i) => (
          <div
            key={character.id}
            className={cn("snap-start shrink-0 py-2", CARD_WIDTH)}
            style={{ contentVisibility: "auto" }}
          >
            <CharacterCard character={character} priority={i < 2} />
          </div>
        ))}
      </div>

      {/* Prev / Next arrows */}
      <button
        onClick={() => scroll("left")}
        className={cn(
          "absolute -left-8 top-[calc(50%-20px)] -translate-y-1/2 -translate-x-3 hidden lg:flex h-9 w-9 items-center justify-center rounded-full  text-center border bg-primary border-border/60 text-foreground shadow-sm transition-opacity duration-200",
          "opacity-0 group-hover/slider:opacity-100",
          page === 0 && "pointer-events-none opacity-0"
        )}
        aria-label="Previous characters"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <button
        onClick={() => scroll("right")}
        className={cn(
          "absolute -right-8 top-[calc(50%-20px)] -translate-y-1/2 translate-x-3 hidden lg:flex h-9 w-9 items-center justify-center rounded-full text-center bg-primary border border-border/60 text-foreground shadow-sm transition-opacity duration-200",
          "opacity-0 group-hover/slider:opacity-100",
          page === totalPages - 1 && "pointer-events-none opacity-0"
        )}
        aria-label="Next characters"
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      {/* Pagination dots */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-1">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToPage(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300 ease-out",
                i === page
                  ? "w-6 bg-accent"
                  : "w-1.5 bg-border hover:"
              )}
              aria-label={`Go to page ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
