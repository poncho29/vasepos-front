import type { Metadata } from "next";

import { Outfit } from "next/font/google";

import "./globals.css";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VASEpos",
  description: "Sistemas de ventas interno",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${outfit.className} antialiased bg-gray-200`}
      >
        {children}
      </body>
    </html>
  );
}
