import { useAppContext } from "@/context/appProvider";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Hexagon from "../hexagon";



export default function PdfDownload() {


    const contentRef = useRef(null)
    const { childrenData, robotData } = useAppContext();
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
                <div ref={contentRef} className="mt-5 bg-white p-6 rounded-md shadow-md">
                    <h1 className="text-3xl font-bold text-center mb-6">Ficha do Personagem</h1>

                    {/* Dados do Pivete */}
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold mb-4">Dados do Pivete</h2>
                        <p><strong>Nome:</strong> {childrenData.name}</p>
                        <p><strong>Classe:</strong> {childrenData.class}</p>
                        <p><strong>Quarto:</strong> {childrenData.room}</p>
                        <p><strong>Objetos:</strong> {childrenData.objects}</p>
                        <p>
                            <strong>{childrenData.unique.label}:</strong> {childrenData.unique.values}
                        </p>
                    </div>

                    <div className="bg-gray-200 p-5 rounded-lg">
                        <div className="grid grid-cols-4 gap-6 text-center mb-6">
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
                        </div>

                        {/* Atributos Hexagonais */}
                        <div className="grid grid-cols-3 gap-6 text-center">
                            <div className="flex flex-col items-center">
                                <Hexagon value={robotData.hexagonValues.durabilidade} />
                                <p className="mt-2">DURABILIDADE</p>
                            </div>
                            <div className="hexagon flex flex-col items-center">
                                <Hexagon value={robotData.hexagonValues.dano} />
                                <p className="mt-2">DANO</p>
                            </div>
                            <div className="hexagon flex flex-col items-center">
                                <Hexagon value={robotData.hexagonValues.mira} />
                                <p className="mt-2">MIRA</p>
                            </div>
                            <div className="hexagon flex flex-col items-center">
                                <Hexagon value={robotData.hexagonValues.velocidade}/>
                                <p className="mt-2">VELOCIDADE</p>
                            </div>
                            <div className="hexagon flex flex-col items-center">
                                <Hexagon value={robotData.hexagonValues.carapaca}/>
                                <p className="mt-2">CARAPAÇA</p>
                            </div>
                            <div className="hexagon flex flex-col items-center">
                            <Hexagon value={robotData.hexagonValues.bateria}/>
                                <p className="mt-2">BATERIA</p>
                            </div>
                        </div>

                        {/* Peças e Técnicas */}
                        <div className="grid grid-cols-2 gap-6 mt-6">
                            {/* Peças */}
                            <div>
                                <h3 className="bg-blue-600 text-white text-center p-2 rounded-t-md">Peças</h3>
                                <div className="bg-gray-100 p-4 rounded-b-md">
                                    {robotData.parts.map((part, index) => (
                                        <div key={index} className="mb-4">
                                            <p><strong>Nome:</strong> {part.label}</p>
                                            <p><strong>Tipo:</strong> {part.value.type}</p>
                                            {part.value.memoryCost && <p><strong>Custo de Memória:</strong> {part.value.memoryCost}</p>}
                                            {part.value.skill && (
                                                <p><strong>{part.value.skill.name}:</strong> {part.value.skill.description}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Técnicas */}
                            <div>
                                <h3 className="bg-blue-600 text-white text-center p-2 rounded-t-md">Técnicas</h3>
                                <div className="bg-gray-100 p-4 rounded-b-md">
                                    {robotData.techs.map((tech, index) => (
                                        <div key={index} className="mb-4">
                                            <p><strong>Nome:</strong> {tech.value.name}</p>
                                            <p><strong>Tipo:</strong> {tech.value.type}</p>
                                            <p><strong>Custo de Bateria:</strong> {tech.value.battery}</p>
                                            <p><strong>Descrição:</strong> {tech.value.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}