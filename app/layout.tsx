import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

export const metadata: Metadata = {
  title: "NG Manager - Gestion de Pays",
  description: "Plateforme de gestion multi-pays avec authentification et rôles hiérarchiques",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <Header />
        <Sidebar />
        <main className="lg:ml-64 pt-20 relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}
