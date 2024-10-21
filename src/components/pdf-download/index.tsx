import { useAppContext } from "@/context/appProvider";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Hexagon from "../hexagon";
import "./style.css"

export default function PdfDownload() {
    const contentRef = useRef(null);
    const { childrenData, robotData } = useAppContext();
    console.log(robotData)
    const handlePrint = useReactToPrint({ contentRef });

    return (
        <>
            <div className="bg-slate-400 mx-5 p-4 rounded-lg shadow-lg">
                <button
                    onClick={() => handlePrint()}
                    className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500 transition-colors"
                >
                    Click para baixar a ficha
                </button>
                <div ref={contentRef} className="pdf-content mt-5 bg-white p-6 rounded-md shadow-md">

                    <div className="page-pivete">
                        <h1 className="text-3xl font-bold text-center mb-6">Ficha do Pivete</h1>
                        <div className="mb-6">
                            <h2 className="text-2xl font-semibold mb-4">Dados do Pivete</h2>
                            <p><strong>Nome:</strong> {childrenData.name}</p>
                            <p><strong>Classe:</strong> {childrenData.class}</p>
                            <p><strong>Quarto:</strong> {childrenData.room}</p>
                            <p><strong>Objetos:</strong> {childrenData.objects}</p>
                            <p><strong>{childrenData.unique.label}:</strong> {childrenData.unique.values}</p>
                            <p><strong>Poderes:</strong></p>
                            {childrenData.powers.map((power) => (
                                <p key={power.name}><strong>{power.name}:</strong> {power.description}</p>
                            ))}
                            <p><strong>Fraquezas:</strong></p>
                            {childrenData.weaknesses.map((weakness) => (
                                <p key={weakness.name}><strong>{weakness.name}:</strong> {weakness.description}</p>
                            ))}
                            <p><strong>Especial:</strong></p>
                            {childrenData.special.map((sp) => (
                                <p key={sp.name}><strong>{sp.name}:</strong> {sp.description}</p>
                            ))}
                            <p><strong>Vínculos:</strong> {childrenData.bonds}</p>
                        </div>
                    </div>

                    <div className="page-break" />

                    <div className="page-cria">
                        <h1 className="text-3xl font-bold text-center mb-6">Ficha do Cria</h1>
                        <div className="bg-gray-200 p-5 rounded-lg">
                            <h2 className="text-2xl font-semibold mb-4">Dados do Cria</h2>
                            <div className="grid grid-cols-5 gap-6 text-center mb-6">
                                <div>
                                    <h3 className="bg-gray-400 text-white p-2 rounded-t-md">Nome</h3>
                                    <p className="bg-gray-100 p-4 rounded-b-md">{robotData.name}</p>
                                </div>
                                <div>
                                    <h3 className="bg-gray-400 text-white p-2 rounded-t-md">Chassi</h3>
                                    <p className="bg-gray-100 p-4 rounded-b-md">{robotData.class}</p>
                                </div>
                                <div>
                                    <h3 className="bg-gray-400 text-white p-2 rounded-t-md">Tipo</h3>
                                    <p className="bg-gray-100 p-4 rounded-b-md">{robotData.type}</p>
                                </div>
                                <div>
                                    <h3 className="bg-gray-400 text-white p-2 rounded-t-md">Personalidade</h3>
                                    <p className="bg-gray-100 p-4 rounded-b-md">{robotData.personality}</p>
                                </div>
                                <div>
                                    <h3 className="bg-gray-400 text-white p-2 rounded-t-md">Rank</h3>
                                    <p className="bg-gray-100 p-4 rounded-b-md">{robotData.rank}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-6 text-center">
                                <div className="flex flex-col items-center">
                                    <Hexagon value={robotData.hexagonValues.durabilidade} />
                                    <p className="mt-2">DURABILIDADE</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <Hexagon value={robotData.hexagonValues.dano} />
                                    <p className="mt-2">DANO</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <Hexagon value={robotData.hexagonValues.mira} />
                                    <p className="mt-2">MIRA</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <Hexagon value={robotData.hexagonValues.velocidade}/>
                                    <p className="mt-2">VELOCIDADE</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <Hexagon value={robotData.hexagonValues.carapaca}/>
                                    <p className="mt-2">CARAPAÇA</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <Hexagon value={robotData.hexagonValues.bateria}/>
                                    <p className="mt-2">BATERIA</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6 mt-6">
                                <div className="bg-stone-400 p-4 rounded-lg">
                                    <h3 className="bg-blue-600 text-white text-center p-2 rounded-t-md text-sm">Peças</h3>
                                    <div className="bg-gray-100 p-4 rounded-b-md text-sm">
                                        {robotData.parts.map((partOption, index) => (
                                            <div key={index} className="mb-2">
                                                <p><strong>Nome:</strong> {partOption.name}</p>
                                                <p><strong>Tipo:</strong> {partOption.type}</p>
                                                {partOption.memoryCost && <p><strong>Custo de Memória:</strong> {partOption.memoryCost}</p>}
                                                {partOption.location && <p><strong>Posição:</strong> {partOption.location}</p>}
                                                {partOption.skill && (
                                                    <p><strong>{partOption.skill.name}:</strong> {partOption.skill.description}</p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="bg-stone-400 p-4 rounded-lg">
                                    <h3 className="bg-blue-600 text-white text-center p-2 rounded-t-md text-sm">Técnicas</h3>
                                    <div className="bg-gray-100 p-4 rounded-b-md text-sm">
                                        {robotData.techs.map((techOption, index) => (
                                            <div key={index} className="mb-2">
                                                <p><strong>Nome:</strong> {techOption.name}</p>
                                                <p><strong>Tipo:</strong> {techOption.type}</p>
                                                <p><strong>Custo de Bateria:</strong> {techOption.battery}</p>
                                                <p><strong>Descrição:</strong> {techOption.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


