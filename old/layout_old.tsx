import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Lora, DM_Sans } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "arrel | autonomous food systems",
  description: "Engineering rigour meets Mediterranean living. Currently under construction.",
  icons: {
    icon: "/favicon.ico", // We will fix this next
  },
};

const lora = Lora({ 
  subsets: ["latin"], 
  variable: "--font-lora" 
});

const dmSans = DM_Sans({ 
  subsets: ["latin"], 
  variable: "--font-dm-sans" 
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
    >
      <body className={`${lora.variable} ${dmSans.variable}`}>
        {children}
      </body>
    </html>
  );
}
