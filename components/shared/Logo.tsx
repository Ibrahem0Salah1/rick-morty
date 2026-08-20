"use client"

import Image from "next/image"
import Link from "next/link"
export function Logo() {
  return (
    <div className="relative flex items-center">
      <Link href={"/"}>
        <Image className="w-[120px] sm:w-[160px] lg:w-[180x]"
        src="/bb1.svg"
        alt="Logo"
        width={180}
        height={164}
        priority
      />
      </Link>
    
    </div>
  )
}
