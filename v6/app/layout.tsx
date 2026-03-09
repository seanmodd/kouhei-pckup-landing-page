import type { Metadata } from "next";
import { Montserrat, Inter, Share_Tech_Mono } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const shareTechMono = Share_Tech_Mono({
  variable: "--font-share-tech-mono",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pckup — AI-Powered Last-Mile Delivery",
  description:
    "From same-day dispatch to enterprise scale — Pckup combines AI intelligence with human expertise to give your business the trust, speed, and control it deserves.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${inter.variable} ${shareTechMono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
