import Link from "next/link"
import { CharactersSlider } from "@/components/landing/CharactersSlider"
import { fetchGraphQL } from '@/lib/server';
import { CharactersResult } from "@/lib/types";
import { cn } from "@/lib/utils";
export async function Characters() {
  const Query = `
    query {
      characters (page : 1) {
        results {
          id
          name
          status
          image
          origin {name }
        }
      }
    }
  `;
  const data = await fetchGraphQL<CharactersResult>(Query);

  return (
    <section className="px-4 md:px-14 py-12">
      <div className="mb-6 flex items-end justify-between gap-4">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
          Characters
        </h2>
        <Link
          href="/characters"
          className="group hidden shrink-0 items-center gap-1.5 text-sm font-medium text-zinc-400 transition-colors hover:text-white sm:flex"
        >
          Explore more characters
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </Link>
      </div>

      <CharactersSlider characters={data.characters.results.slice(0, 10)} />

      <Link
        href="/characters"
         className={cn(
              "truncate font-display text-base font-semibold tracking-tight text-white transition-colors duration-200",
              "hover:text-[#fbdf00]"
            )}
      >
        <span className="flex  gap-2 py-4 w-fit bg-[linear-gradient(#fbdf00,#fbdf00)] bg-size-[0%_1px] bg-bottom-left bg-no-repeat pb-0.5 transition-[background-size] duration-300 ease-out hover:bg-size-[100%_1px]">
            Explore more characters
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </span>
        
      </Link>
    </section>
  )
}