import RootLayout from "@/app/layout";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { useEffect, useState } from "react";

export default function AboutPage() {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => setDarkMode(!darkMode);

    return (
        <>
            <RootLayout>
                <>
                    <main className="min-h-screen pt-5 pl-5">
                        <h1 className="text-4xl font-bold">Sobre nós (No caso somente eu hahaha)</h1>
                        <p className="mt-4">
                            Olá, me chamo <a className="font-bold" href="https://www.linkedin.com/in/yagordmoraes/">Yago</a> , criador do site que você está usando.
                        </p>
                        <p>Venho trabalhando nesse projeto para juntar 2 coisas que gosto bastante: programação e rpg.
                            Dito isso pensei: Por que não fazer algo que posso me aperfeiçoar e também a comunidade desse RPG nacional?</p>
                        <p>
                            O projeto é feito de fã para fã, para que seja uma plataforma de geração facilitada de fichas e que possa imprimir ou gera um pdf simples.
                        </p>
                        <p>Essa seria a v1 desse projeto, aceito muito sugestões para melhoria do projeto (desde layout e código) para que fique algo mais interessante para a comunidade.</p>
                    </main>
                </>
            </RootLayout>


        </>

    );
}
