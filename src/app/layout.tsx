import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";



const lineseed = localFont({
  src: [
    {
      path: './fonts/LineSeed/lineseedsansth_rg-webfont.woff2',
      weight: "400",
    },
    {
      path: './fonts/LineSeed/lineseedsansth_bd-webfont.woff2',
      weight: "700",
    },
    {
      path: './fonts/LineSeed/lineseedsansth_th-webfont.woff2',
      weight: "300",
    }
  ]
}
);

export const metadata: Metadata = {
  title: "CheckBill",
  description: "CheckBill is a simple bill splitting app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className={lineseed.className}>{children}</body>
    </html>
  );
}
