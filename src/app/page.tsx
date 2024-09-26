"use client"
import { useEffect, useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Banner from "@/components/banner";
import WarningPlayers from "@/components/warning-players";
import SelectChildren from "@/components/select-children";
import InputBox from "@/components/inputBox";
import { Children } from "@/types/children";
import ChildrenInputs from "@/components/children-inputs";
import SelectBox from "@/components/select-box";
import HexagonInput from "@/components/hexagon-input";

const personalities = ["Astuto", "Bruto", "Calmo", "Tímido", "Humilde", "Cuidadosos"]
const classes = ["Shoto", "Shooter", "Beast", "Lancer"]
const types = ["Água", "Fogo", "Vento", "Terra", "Elétrico", "Neutro"]

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [children, setChildren] = useState<Children | null>(null);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleChildren = (children: Children) => {
    setChildren(children);
  };

  useEffect(() => {
    console.log("children", children);
  }, [children]);

  return (
    <div className={darkMode ? "dark" : ""}>
      <Header onToggleDarkMode={toggleDarkMode} />
      <main className="bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen transition-colors duration-300">
        <div className="h-5" />
        <Banner />
        <WarningPlayers />
        <SelectChildren onSelectChildren={handleChildren} />
        <ChildrenInputs children={children} />
        <div className="flex flex-col bg-orange-400 p-2 m-5 rounded-lg">
          <span className="text-white text-2xl font-bold">Dados do Cria</span>
          <div className="grid grid-cols-4 gap-3">
            <InputBox label="Nome:" linkedFor="robot-name" height="h-6" />
            <SelectBox label="Personalidade:" data={personalities} linkedFor="robot-personality" />
            <SelectBox label="Chassi:" data={classes} linkedFor="robot-class" />
            <SelectBox label="Tipo:" data={types} linkedFor="robot-type" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <HexagonInput label="Durabilidade"/>
            <HexagonInput label="Dano"/>
            <HexagonInput label="Mira"/>
            <HexagonInput label="Velocidade" />
            <HexagonInput label="Carapaça" />
            <HexagonInput label="Bateria" />
          </div>

        </div>
        <div className="h-2" />
      </main>
      <Footer />
    </div>
  );
}
