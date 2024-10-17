import { useState, useEffect, AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from 'react';
import HexagonInput from "../hexagon-input";
import SelectBox from "../select-box";
import robotClasses from "../../data/robot-class.json";
import robotPersonalities from "../../data/personalities.json";
import InputBox from '../inputBox';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import techs from "../../data/techniques.json";
import parts from "../../data/parts.json";
import { useAppContext } from '@/context/appProvider';

const animatedComponents = makeAnimated();

const types = ["Água", "Fogo", "Vento", "Terra", "Elétrico", "Neutro"];
const ranks = ["Nulo", "Latão", "Bronze", "Prata", "Ouro", "Full Metal"];

export default function RobotInputs() {
    const [filter, setFilter] = useState({
        class: "",
        type: "",
        personality: "",
        rank: ""
    });
    const [baseHexagonValues, setBaseHexagonValues] = useState({
        durabilidade: 0,
        mira: 0,
        velocidade: 0,
        carapaca: 0,
        dano: 0,
        bateria: 0
    });

    const [hexagonValues, setHexagonValues] = useState({
        durabilidade: 0,
        mira: 0,
        velocidade: 0,
        carapaca: 0,
        dano: 0,
        bateria: 0
    });

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [filteredParts, setFilteredParts] = useState<any>([]);
    const [filteredTechniques, setFilteredTechniques] = useState<any>([]);
    const [selectedOptions, setSelectedOptions] = useState<any>([]);
    const [selectedParts, setSelectedParts] = useState<any>([])

    const { robotData, setRobotData } = useAppContext();
    const handleTechniqueChange = (selectedOptions: any) => {
        setSelectedOptions(selectedOptions);
        setRobotData((prev) => ({
            ...prev,
            techs: selectedOptions
        }))
    };

    const handlePartChange = (selectedOptions: any) => {
        setSelectedParts(selectedOptions);
        setRobotData((prev) => ({
            ...prev,
            parts: selectedOptions
        }))

    };

    useEffect(() => {
        const filteredParts = parts.filter((part) => {
            const hasNoPrerequisite = !part.prerequisite || Object.keys(part.prerequisite).length === 0;
            const matchesPrerequisite = part.prerequisite?.class.includes(filter.class);
            return hasNoPrerequisite || matchesPrerequisite;
        });

        const filterNoRequireRequisite = techs.filter((tech) => !tech.prerequisite)

        const filterRequireClassRequisite = techs.filter(technique => {
            const classMatch = technique?.prerequisite?.class ? technique.prerequisite.class.includes(filter.class) : false;
            return classMatch
        });

        const filterRequireTypeRequisite = filterRequireClassRequisite.filter((technique) => {
            const typeMatch = technique?.prerequisite?.type ? !technique.prerequisite.type.includes(filter.type) : false;
            return typeMatch
        })

        const otherFilteredTechniques = filterRequireClassRequisite.filter(
            (technique) => !filterRequireTypeRequisite.includes(technique)
        );
        const filteredTechniques = [...filterNoRequireRequisite, ...otherFilteredTechniques]

        setFilteredParts(filteredParts);
        setFilteredTechniques(filteredTechniques);
    }, [filter.class, filter.type]);

    const handleNameChange = (name: string, value: string) => {
        setRobotData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleClassChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedClass = robotClasses.find(
            (rc) => rc.name === event.target.value
        );

        if (selectedClass) {
            setName(selectedClass.name);
            setDescription(selectedClass.description);
            setBaseHexagonValues(selectedClass.status);
            setHexagonValues(selectedClass.status);
            setFilter((prev) => ({ ...prev, class: selectedClass.name }));
            setRobotData((prev) => ({
                ...prev,
                name: selectedClass.name,
                description: selectedClass.description,
                class: selectedClass.name,
                hexagonValues: selectedClass.status
            }));
        }
    };


    const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedType = event.target.value;
        setFilter((prev) => ({ ...prev, type: selectedType }));
        setRobotData((prev) => ({
            ...prev,
            type: event.target.value
        }));
    };

    const handlePersonalityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedPersonality = robotPersonalities.find(
            (rp) => rp.name.toLowerCase() === event.target.value.toLowerCase()
        );

        if (selectedPersonality) {
            setFilter((prev) => ({ ...prev, personality: selectedPersonality.name }))
            setHexagonValues({
                durabilidade: baseHexagonValues.durabilidade + selectedPersonality.status.durabilidade,
                mira: baseHexagonValues.mira + selectedPersonality.status.mira,
                velocidade: baseHexagonValues.velocidade + selectedPersonality.status.velocidade,
                carapaca: baseHexagonValues.carapaca + selectedPersonality.status.carapaca,
                dano: baseHexagonValues.dano + selectedPersonality.status.dano,
                bateria: baseHexagonValues.bateria + selectedPersonality.status.bateria,
            });
            setRobotData((prev) => ({
                ...prev,
                personality: selectedPersonality.name,
                hexagonValues: {
                    durabilidade: baseHexagonValues.durabilidade + selectedPersonality.status.durabilidade,
                    mira: baseHexagonValues.mira + selectedPersonality.status.mira,
                    velocidade: baseHexagonValues.velocidade + selectedPersonality.status.velocidade,
                    carapaca: baseHexagonValues.carapaca + selectedPersonality.status.carapaca,
                    dano: baseHexagonValues.dano + selectedPersonality.status.dano,
                    bateria: baseHexagonValues.bateria + selectedPersonality.status.bateria,
                }
            }));
        }
    };

    const handleRankChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedRank = event.target.value;
        setFilter((prev) => ({ ...prev, rank: selectedRank }));
        setRobotData((prev) => ({
            ...prev,
            rank: event.target.value
        }));
    }




    const handleHexagonValueChange = (attribute: string, newValue: number) => {
        setHexagonValues((prevValues) => ({
            ...prevValues,
            [attribute]: newValue
        }));
        setRobotData((prev) => ({
            ...prev,
            hexagonValues: {
                ...prev.hexagonValues,
                [attribute]: newValue
            }
        }));
    };
    
    return (
        <div className="flex flex-col bg-orange-400 p-2 m-5 rounded-lg">
            <span className="text-white text-2xl font-bold">Dados do Cria</span>
            <div className="grid grid-cols-5 gap-3">
                <InputBox onChange={(value) => handleNameChange("name", value)} label="Nome:" linkedFor="robot-name" height="h-6" />
                <SelectBox
                    label="Chassi:"
                    data={robotClasses.map((rc) => rc.name)}
                    placeholder="Selecione o chassi"
                    linkedFor="robot-class"
                    onChange={handleClassChange}
                    value={filter.class}
                />
                <SelectBox
                    label="Personalidade:"
                    data={robotPersonalities.map((rp) => rp.name)}
                    placeholder="Selecione a personalidade"
                    linkedFor="robot-personality"
                    onChange={handlePersonalityChange}
                    value={filter.personality}
                />
                <SelectBox label="Tipo:" data={types} placeholder="Selecione o tipo" linkedFor="robot-type" onChange={handleTypeChange} value={filter.type} />
                <SelectBox label="Rank:" data={ranks} placeholder="Qual seu rank?" linkedFor="robot-rank" onChange={handleRankChange} value={filter.rank} />
            </div>
            {(name && description) && (
                <div className='text-white'>
                    <div>{`${name} : ${description}`}</div>
                </div>
            )}

            <div className="h-2" />
            <div className="grid grid-cols-3 gap-3">
                <HexagonInput
                    label="Durabilidade"
                    value={hexagonValues.durabilidade}
                    onChange={(e) => handleHexagonValueChange('durabilidade', Number(e.target.value))}
                />
                <HexagonInput
                    label="Dano"
                    value={hexagonValues.dano}
                    onChange={(e) => handleHexagonValueChange('dano', Number(e.target.value))}
                />
                <HexagonInput
                    label="Mira"
                    value={hexagonValues.mira}
                    onChange={(e) => handleHexagonValueChange('mira', Number(e.target.value))}
                />
                <HexagonInput
                    label="Velocidade"
                    value={hexagonValues.velocidade}
                    onChange={(e) => handleHexagonValueChange('velocidade', Number(e.target.value))}
                />
                <HexagonInput
                    label="Carapaça"
                    value={hexagonValues.carapaca}
                    onChange={(e) => handleHexagonValueChange('carapaca', Number(e.target.value))}
                />
                <HexagonInput
                    label="Bateria"
                    value={hexagonValues.bateria}
                    onChange={(e) => handleHexagonValueChange('bateria', Number(e.target.value))}
                />
            </div>
            <div>
                <div className="mt-2 grid grid-cols-2 gap-3">
                    <div>
                        <div className="bg-stone-400 rounded-lg">
                        <div className='flex items-center justify-between px-1'>
                            <span className="text-white font-semibold">Peças</span>
                        </div>
                        <Select
                            placeholder="Selecione as peças"
                            components={animatedComponents}
                            closeMenuOnSelect={false}
                            isMulti
                            onChange={handlePartChange}
                            options={filteredParts.map((part: { name: any; }) => ({ value: part, label: part.name }))} />  
                        </div>
                        
                        {selectedParts.length > 0 && (
                            <div className='bg-stone-400 rounded-lg mt-5'>
                                <h3>Peças Selecionadas:</h3>
                                <ul>
                                    {selectedParts.map((tech: {
                                        label: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; value: {
                                            skill: any;
                                            memoryCost: any;
                                            position: any; type: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; battery: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; description: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined;
                                        };
                                    }, label: any) => (
                                        <div className='bg-white border my-2'>
                                            <li>Nome: {tech.label}</li>
                                            <li>Tipo: {tech.value.type}</li>
                                            {tech.value.position &&
                                                <li>Posição: {tech.value.position}</li>
                                            }
                                            {tech.value.memoryCost &&
                                                <li>Custo de memória: {tech.value.memoryCost}</li>
                                            }
                                            {tech.value.skill &&
                                                <li>{tech.value.skill.name}: {tech.value.skill.description}</li>
                                            }

                                        </div>

                                    ))}
                                </ul>

                            </div>
                        )}

                    </div>
                    <div>
                        <div className='bg-stone-400 rounded-lg'>
                            <span className="text-white font-semibold">Técnicas</span>
                            <Select
                                placeholder="Selecione as técnicas"
                                components={animatedComponents}
                                closeMenuOnSelect={false}
                                isMulti
                                onChange={handleTechniqueChange}
                                options={filteredTechniques.map((tech: { name: any; }) => ({ value: tech, label: tech.name }))}
                            />
                        </div>

                        {selectedOptions.length > 0 && (
                            <div className='bg-stone-400 rounded-lg mt-5'>
                                <h3>Técnicas Selecionadas:</h3>
                                <ul>
                                    {selectedOptions.map((tech: { label: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; value: { type: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; battery: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; description: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }; }, label: any) => (
                                        <div className='bg-white border my-2'>
                                            <li>Nome: {tech.label}</li>
                                            <li>Tipo: {tech.value.type}</li>
                                            <li>Custo de bateria: {tech.value.battery}</li>
                                            <li>Descrição: {tech.value.description}</li>
                                        </div>

                                    ))}
                                </ul>
                            </div>
                        )}

                    </div>

                </div>
            </div>
        </div>
    );
}
