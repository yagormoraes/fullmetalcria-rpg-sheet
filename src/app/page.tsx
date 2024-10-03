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
  const [children, setChildren] = useState<Children | null>(null);
  const [childrenInputs, setChildrenInputs] = useState<any>(null);
  const [robotInputs, setRobotInputs] = useState<any>(null);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleChildren = (children: Children) => {
    setChildren(children);
  };  

  const [childrenData, setChildrenData] = useState<Children | null>(null);

    const handleInputChange = (data: any) => {
        setChildrenData(data);
    };

  return (
    <div className={darkMode ? "dark" : ""}>
      <Header onToggleDarkMode={toggleDarkMode} />
      <main className="bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen transition-colors duration-300">
        <div className="h-5" />
        <Banner />
        <WarningPlayers />
        <ChildrenSelect/>
        {/* <RobotInputs /> */}
        <PdfDownload children={children}/>
        
        <div className="h-2" />
      </main>
      <Footer />
    </div>
  );
}
