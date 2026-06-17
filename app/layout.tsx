import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alex Morgan — Full-Stack Developer & Designer",
  description:
    "Personal portfolio of Alex Morgan — crafting elegant digital experiences with modern web technologies.",
  keywords: ["portfolio", "developer", "designer", "full-stack", "react", "nextjs"],
  authors: [{ name: "Alex Morgan" }],
  openGraph: {
    title: "Alex Morgan — Full-Stack Developer & Designer",
    description:
      "Personal portfolio of Alex Morgan — crafting elegant digital experiences with modern web technologies.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="bg-[#0f0f0f] text-white font-sans antialiased selection:bg-indigo-500/30 selection:text-indigo-200">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}