"use client"
import { useEffect, useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Banner from "@/components/banner";
import WarningPlayers from "@/components/warning-players";
import SelectChildren from "@/components/select-children";
import InputBox from "@/components/inputBox";
import { Children } from "@/types/children";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [children, setChildren] = useState<Children | null>(null); // Inicialize com null

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
        <div className="flex flex-col bg-orange-400 p-2 m-5 rounded-lg">
          <span className="text-white text-2xl font-bold">Dados do Pivete</span>
          <div className="grid grid-cols-2 gap-3 px-2">
            <InputBox label="Nome:" linkedFor="children-name" height="h-6" />
            <InputBox
              label="Classe do Pivete:"
              height="h-6"
              linkedFor="children-class"
              value={children?.class || ""}
              disable={true}
            />
          </div>
          <div className="grid grid-cols-3 gap-3 px-2">
            <InputBox
              label="Seu quarto é:"
              linkedFor="children-room"
              placeholder={children?.room || ""}
              height="h-20"
            />
            <InputBox
              label="Objetos icônicos:"
              linkedFor="children-object"
              placeholder={children?.objects || ""}
              height="h-20"
            />
            <InputBox
              label={children?.unique ? children.unique.label : "Traço único:"}
              linkedFor="children-unique"
              placeholder={children?.unique?.values || ""}
              height={children?.unique?.values?.length && children.unique.values.length > 140 ? "h-32" : "h-20"}
            />

          </div>
        </div>
        <div className="h-2" />
      </main>
      <Footer />
    </div>
  );
}
