import { Playfair_Display, Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll/SmoothScroll";
import Navbar from "@/components/Navbar/Navbar";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
  weight: ["400", "700"],
});

export const metadata = {
  title: "Aiswarya Kottiyal — UI/UX Designer & UI Developer",
  description:
    "Portfolio of Aiswarya Kottiyal, a UI/UX Designer and UI Developer specializing in creating stunning, user-centric digital experiences with Figma, Next.js, and modern frontend technologies.",
  keywords: [
    "UI/UX Designer",
    "UI Developer",
    "Portfolio",
    "Figma",
    "Next.js",
    "Frontend Developer",
    "Aiswarya Kottiyal",
  ],
  openGraph: {
    title: "Aiswarya Kottiyal — UI/UX Designer & UI Developer",
    description:
      "Portfolio of Aiswarya Kottiyal, crafting premium digital experiences.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${spaceGrotesk.variable} ${spaceMono.variable}`}
    >
      <body>
        <SmoothScroll>
          <Navbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
