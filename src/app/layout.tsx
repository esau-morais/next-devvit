import type { ReactNode } from "react";

import { Providers } from "@/components/providers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import NavBar from "@/app/_components/nav-bar";

import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Devvit",
  description: "Reddit alternative for devs",
};

export default function RootLayout({
  children,
  authModal,
}: {
  children: ReactNode;
  authModal: ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        "dark bg-background text-foreground antialiased",
        inter.className,
      )}
    >
      <body className={cn("min-h-screen pt-12 antialiased", inter.className)}>
        <Providers>
          <NavBar />
          {authModal}

          <div className="container max-w-7xl mx-auto h-full pt-12">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
