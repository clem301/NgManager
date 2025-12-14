import type { Metadata } from "next";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}
