import type { Metadata } from "next";
import { Nanum_Myeongjo } from "next/font/google";
import "./globals.css";
import { SITE } from "@/site.config";

const serif = Nanum_Myeongjo({
  weight: ["400", "700", "800"],
  subsets: ["latin"],
  preload: false,
  display: "swap",
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: `${SITE.name} | 프리미엄 화환·꽃 전국 당일배송`,
  description: `품격 있는 축하화환·근조화환·꽃다발·꽃바구니·난. ${SITE.name}이 전국 어디든 당일 정성껏 전해드립니다. 주문·상담 ${SITE.phone}`,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className={`h-full antialiased ${serif.variable}`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
