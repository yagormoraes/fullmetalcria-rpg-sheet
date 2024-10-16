"use client"
import { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Banner from "@/components/banner";
import WarningPlayers from "@/components/warning-players";
import SelectChildren from "@/components/select-children";
import { Children } from "@/types/children";
import ChildrenInputs from "@/components/children-inputs";
import RobotInputs from "@/components/robot-inputs";
import PdfDownload from "@/components/pdf-download"
import ChildrenSelect from "@/components/children-select";


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
        <ChildrenSelect/>
        <RobotInputs />
        
        <div className="h-2" />
      </main>
      <Footer />
    </div>
  );
}
