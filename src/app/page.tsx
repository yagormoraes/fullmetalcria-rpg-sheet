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
        <div className="h-2" />
      </main>
      <Footer />
    </div>
  );
}
