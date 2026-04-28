import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "ASUS TUF Gaming A15 | Power Meets Precision",
    description:
        "Experience the ASUS TUF Gaming A15 — Ryzen 7, RTX 4060, 165Hz QHD display. Military-grade durability meets elite gaming performance.",
    keywords: ["ASUS TUF A15", "gaming laptop", "RTX 4060", "Ryzen 7", "165Hz"],
    openGraph: {
        title: "ASUS TUF Gaming A15 | Power Meets Precision",
        description:
            "Experience the ASUS TUF Gaming A15 — Ryzen 7, RTX 4060, 165Hz QHD display.",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            {/* No overflow class on body — overflow-x:hidden/clip breaks position:sticky */}
            <body>{children}</body>
        </html>
    );
}
