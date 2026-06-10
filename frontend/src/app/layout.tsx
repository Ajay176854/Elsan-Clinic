import type { Metadata } from "next";
import { DM_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

import Providers from "../components/Providers";
import SmoothScrolling from "../components/SmoothScrolling";
import { cn } from "@/lib/utils";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant" 
});

export const metadata: Metadata = {
  title: "Elsan Clinic — Trusted Healthcare",
  description: "Advanced Clinic Management System. Comprehensive medical care delivered with compassion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(dmSans.variable, cormorant.variable, "scroll-smooth")}>
      <body className="font-sans antialiased bg-slate-50 text-slate-900 relative">
        <Providers>
          <SmoothScrolling>
            {children}
          </SmoothScrolling>
        </Providers>
      </body>
    </html>
  );
}
