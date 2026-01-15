import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ASUS TUF A15",
  description: "ASUS TUF Gaming A15 - Pure Performance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
