
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Xiao Liu Ren Divination",
  description: "Traditional Chinese Divination",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
