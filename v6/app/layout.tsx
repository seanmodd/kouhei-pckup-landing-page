import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const tasaOrbiter = localFont({
  src: [
    { path: "../TASA_Orbiter_400.ttf", weight: "400", style: "normal" },
    { path: "../TASA_Orbiter_700.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-tasa-orbiter",
  display: "swap",
});

const ibmPlex = IBM_Plex_Sans({
  variable: "--font-ibm-plex",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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
        className={`${tasaOrbiter.variable} ${ibmPlex.variable}`}
      >
        {children}
      </body>
    </html>
  );
}

