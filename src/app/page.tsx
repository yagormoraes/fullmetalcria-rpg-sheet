"use client"
import { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Banner from "@/components/banner";
import WarningPlayers from "@/components/warning-players";
import SelectChildren from "@/components/select-children";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={darkMode ? "dark" : ""}>
      <Header onToggleDarkMode={toggleDarkMode} />
      <main className="bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen transition-colors duration-300">
        <div className="h-5"/>
        <Banner />
        <WarningPlayers/>
        <SelectChildren/>
        <div className="flex flex-col bg-orange-400 p-2 m-5 rounded-lg">
            <span className="text-white text-2xl font-bold">Dados do Pivete</span>
            <div className="flex overflow-x-auto space-x-4 p-2">
                <label htmlFor="children-name">Nome:</label>
                <input id="children-name" type="text" />
                <label htmlFor="children-room">Seu querto é:</label>
                <input id="children-room" type="text" />
                <label htmlFor="children-objects">Objetos icônicos:</label>
                <input id="children-objects" type="text" />
            </div>
        </div>
        <div className="h-2"/>
        
      </main>
      <Footer />
    </div>
  );
}

