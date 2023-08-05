import { Footer, Header } from "@/components";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CssBaseline } from "@mui/material";
import { ThemeWrapper } from "@/components/interface/theme";

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
            <Header />
            <main className="p-4 mb-auto">{children}</main>
            <Footer />
          </div>
        </ThemeWrapper>
      </body>
    </html>
  );
}
