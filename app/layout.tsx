import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import NextAuthSessionProvider from "@/components/ui/session-provider";
import AutoLogout from "@/components/ui/auto-logout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bygglov.se",
  description: "AI-baserad bygglovsrådgivning och bokning av rådgivare.",
  icons: {
    icon:"/images/Bygglov-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NextAuthSessionProvider>
          <AutoLogout />
          <Toaster />
          {children}
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}