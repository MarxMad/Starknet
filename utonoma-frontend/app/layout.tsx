import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StarknetProvider } from "@/lib/providers";
import { ClerkProvider } from "@clerk/nextjs";
import { ChipiProvider } from "@chipi-stack/nextjs";

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "UTONOMA - Plataforma de Videos Descentralizada",
  description: "Comparte videos, gana VERSY tokens en Starknet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <ChipiProvider>
        <html lang="es" suppressHydrationWarning>
          <body className={inter.className}>
            <StarknetProvider>
              {children}
            </StarknetProvider>
          </body>
        </html>
      </ChipiProvider>
    </ClerkProvider>
  );
}
