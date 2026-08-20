import type { Metadata } from "next";
import { Chakra_Petch, Manrope, Geist_Mono } from "next/font/google"
import "./globals.css";
import { Providers } from "./providers";
import Header from "@/components/shared/Header";
import { Footer } from "@/components/landing/Footer";

const chakra = Chakra_Petch({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
})
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
})
const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rick & Morty — Multiverse Explorer",
  description: "Explore characters, episodes, and locations from the Rick and Morty multiverse.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`dark ${chakra.variable} ${manrope.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Header />
        <Providers>
          <main className="flex-1">{children}</main>
        </Providers>
        <Footer/>
      </body>
    </html>
  );
}
