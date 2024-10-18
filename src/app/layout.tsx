import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fichas Full Metal Cria",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <link rel="icon" type="image/png" href="/assets/favicon.png" />
      <body>
        {children}
      </body>
    </html>
  );
}
