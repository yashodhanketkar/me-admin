import { Footer } from "@/components";
import { ThemeWrapper } from "@/context";
import { CssBaseline } from "@mui/material";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yashodhan | Admin",
  description: "Portfolio websites admin panel and API built with Next.Js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeWrapper>
          <CssBaseline />
          <div className="flex flex-col min-h-screen">
            <div className="mb-auto">{children}</div>
            <Footer />
          </div>
        </ThemeWrapper>
      </body>
    </html>
  );
}
