"use client";
import { useEffect, useState } from "react";
import Banner from "@/components/banner";
import WarningPlayers from "@/components/warning-players";
import RobotInputs from "@/components/robot-inputs";
import PdfDownload from "@/components/pdf-download";
import ChildrenSelect from "@/components/children-select";
import { AppProvider } from "@/context/appProvider";
import RootLayout from "@/app/layout";

export default function Home() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <RootLayout>
            <AppProvider>
                <main className="bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen transition-colors duration-300">
                    <div className="h-5" />
                    <Banner />
                    <WarningPlayers />
                    <ChildrenSelect />
                    <RobotInputs />
                    <PdfDownload />
                    <div className="h-2" />
                </main>
            </AppProvider>
        </RootLayout>

    );
}
