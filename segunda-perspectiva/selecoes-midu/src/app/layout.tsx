import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Seleções Midu - Plataforma de Recrutamento Editorial",
  description: "Conectando talentos excepcionais com oportunidades extraordinárias no mercado brasileiro",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
      </body>
    </html>
  );
}
