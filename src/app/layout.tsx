"use client"
import { useState, useEffect } from "react";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { AppProvider } from "@/context/appProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  if (!mounted) {
    return null; 
  }

  return (
    <html lang="pt-br" className={darkMode ? "dark" : ""}>
      <head>
        <link rel="icon" type="image/webp" href="/assets/favicon.webp" />
        <title>Ficha Full Metal Cria</title>
      </head>
      <body className="bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen transition-colors duration-300">
        <AppProvider>
          <Header onToggleDarkMode={toggleDarkMode} />
          <main>{children}</main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
