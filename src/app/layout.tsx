import type { Metadata } from "next";
import { Inter, Playfair_Display, Noto_Sans_Telugu } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });
const telugu = Noto_Sans_Telugu({
  subsets: ["telugu"],
  weight: ["400", "700"],
  variable: "--font-telugu"
});

export const metadata: Metadata = {
  title: "Advaitha Yogam | Eternal Spiritual Knowledge",
  description: "A sanctuary of spiritual wisdom dedicated to the teachings of our Guruji. Explore non-duality, pranayama, and ancient philosophy.",
  icons: {
    icon: "/favicon.ico",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} ${telugu.variable} font-sans antialiased bg-cream text-sage-900`}>
        {children}
      </body>
    </html>
  );
}
