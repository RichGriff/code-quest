import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import "./globals.css";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";
import Footer from "@/components/Footer";
import { ClerkProvider } from '@clerk/nextjs'

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Code Quest",
  description: "Navigate the realms of code and conquer the quest for knowledge!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
