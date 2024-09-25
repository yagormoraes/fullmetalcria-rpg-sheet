"use client"
import { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Banner from "@/components/banner";
import WarningPlayers from "@/components/warning-players";
import SelectChildren from "@/components/select-children";
import InputBox from "@/components/inputBox";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={darkMode ? "dark" : ""}>
      <Header onToggleDarkMode={toggleDarkMode} />
      <main className="bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen transition-colors duration-300">
        <div className="h-5" />
        <Banner />
        <WarningPlayers />
        <SelectChildren />
        <div className="flex flex-col bg-orange-400 p-2 m-5 rounded-lg">
          <span className="text-white text-2xl font-bold">Dados do Pivete</span>
          <div className="p-2">
            <InputBox label="Nome:" value="children-name" />
          </div>
          <div className="grid grid-cols-3 gap-3 px-2">
            <InputBox label="Seu quarto é:" value="children-room" />
            <InputBox label="Objetos icônicos:" value="children-object" />
            <InputBox label="Traço único:" value="children-unique" />
          </div>
        </div>
        <div className="h-2" />

      </main>
      <Footer />
    </div>
  );
}

