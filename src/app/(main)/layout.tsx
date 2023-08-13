import { Header } from "@/components";
import { AuthWrapper } from "@/context/auth";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yashodhan",
  description: "Portfolio websites admin panel and API built with Next.Js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthWrapper>
      <div className="mb-auto">
        <Header />
        <main className="p-4">{children}</main>
      </div>
    </AuthWrapper>
  );
}
