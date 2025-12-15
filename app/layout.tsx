import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import Script from "next/script";

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
        <AuthProvider>
          {children}
        </AuthProvider>
        <Script src="/admin.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
