import { useAppContext } from "@/context/appProvider";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";



export default function PdfDownload() {


    const contentRef = useRef(null)
    const { childrenData, robotData } = useAppContext();
    console.log(robotData, childrenData)
    const handlePrint = useReactToPrint({ contentRef });
    return (
        <>
            <div className="bg-slate-400 mx-5">
                <button onClick={() => handlePrint()}>Click para baixar a ficha</button>
                <div ref={contentRef}>
                    <h1>Ficha do Personagem</h1>
                    <h2>Dados do Pivete:</h2>
                    <p>Nome: {childrenData.name}</p>
                    <p>Classe: {childrenData.class}</p>
                    <p>Quarto: {childrenData.room}</p>
                    <p>Objetos: {childrenData.objects}</p>
                    <p>{childrenData.unique.label}: {childrenData.unique.values}</p>
                    <h2>Dados do Cria:</h2>
                    <p>Nome: {robotData.name}</p>
                    <p>Chassi: {robotData.class}</p>
                    <p>Tipo: {robotData.type}</p>
                    <p>Personalidade: {robotData.personality}</p>
                    <p>Rank: {robotData.rank}</p>
                    <p>Atributos:</p>
                    <p>Durabilidade: {robotData.hexagonValues.durabilidade}</p>
                    <p>Mira: {robotData.hexagonValues.mira}</p>
                    <p>Velocidade: {robotData.hexagonValues.velocidade}</p>
                    <p>Carapaca: {robotData.hexagonValues.carapaca}</p>
                    <p>Dano: {robotData.hexagonValues.dano}</p>
                    <p>Bateria: {robotData.hexagonValues.bateria}</p>
                    <p>Técnicas:</p>
                    {robotData.techs.map((tech) => (
                        <>
                            <p>Nome: {tech.value.name}</p>
                            <p>Tipo: {tech.value.type}</p>
                            <p>Custo de bateria: {tech.value.battery}</p>
                            <p>Descrição: {tech.value.description}</p>

                        </>
                    ))}
                    <p>Peças Selecionadas:</p>
                    {robotData.parts.map((part) => (
                        <>
                            <p>Nome: {part.label}</p>
                            <p>Tipo: {part.value.type}</p>
                            {part.value.position &&
                                <p>Posição: {part.value.position}</p>
                            }
                            {part.value.memoryCost &&
                                <p>Custo de memória: {part.value.memoryCost}</p>
                            }
                            {part.value.skill &&
                                <p>{part.value.skill.name}: {part.value.skill.description}</p>
                            }
                        </>
                    ))}

                </div>
            </div>
        </>
    );
}