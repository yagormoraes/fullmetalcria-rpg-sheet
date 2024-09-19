"use client"
import { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Banner from "@/components/banner";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={darkMode ? "dark" : ""}>
      <Header onToggleDarkMode={toggleDarkMode} />
      <main className="bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen transition-colors duration-300">
        <Banner/>
      </main>
      <Footer/>
    </div>
  );
}

