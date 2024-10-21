import { useState, useEffect } from 'react';
import HexagonInput from "../hexagon-input";
import SelectBox from "../select-box";
import robotClasses from "../../data/robot-class.json";
import robotPersonalities from "../../data/personalities.json";
import InputBox from '../inputBox';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import techs from "../../data/techniques.json";
import parts from "../../data/parts.json";
import { Part, RobotData, Technique, useAppContext } from '@/context/appProvider';

const animatedComponents = makeAnimated();

const types = ["Água", "Fogo", "Vento", "Terra", "Elétrico", "Neutro"];
const ranks = ["Nulo", "Latão", "Bronze", "Prata", "Ouro", "Full Metal"];

interface SelectOption<T> {
    value: T;
    label: string;
}

const mapToSelectOption = <T extends { name: string }>(item: T): SelectOption<T> => ({
    value: item,
    label: item.name,
});

export default function RobotInputs() {
    const [filter, setFilter] = useState({
        class: "",
        type: "",
        personality: "",
        rank: ""
    });

    const [filteredParts, setFilteredParts] = useState<SelectOption<Part>[]>([]);
    const [filteredTechniques, setFilteredTechniques] = useState<SelectOption<Technique>[]>([]);
    const [selectedParts, setSelectedParts] = useState<Part[]>([]);
    const [selectedTechniques, setSelectedTechniques] = useState<Technique[]>([]);

    const { robotData, setRobotData } = useAppContext();

    const [baseHexagonValues, setBaseHexagonValues] = useState<RobotData['hexagonValues'] | null>(null);

    useEffect(() => {
        setFilteredParts(parts.map(mapToSelectOption));
        setFilteredTechniques(techs.map(mapToSelectOption));
    }, []);

    const handleFilterChange = (key: keyof typeof filter, value: string) => {
        setFilter((prev) => ({ ...prev, [key]: value }));
        setRobotData((prev) => ({ ...prev, [key]: value }));
    };

    const handleInputChange = (input: string, value: string) => {
        setRobotData((prev) => ({ ...prev, [input]: value }));
    };

    const handleHexagonValueChange = (attribute: keyof RobotData['hexagonValues'], newValue: number) => {
        setRobotData((prev) => ({
            ...prev,
            hexagonValues: {
                ...prev.hexagonValues,
                [attribute]: newValue,
            },
        }));
    };

    const handlePartChange = (selected: SelectOption<Part>[]) => {
        const selectedPartsValues = selected.map((option) => option.value);
        setSelectedParts(selectedPartsValues);
        setRobotData((prev) => ({ ...prev, parts: selectedPartsValues }));
    };

    const handleTechniqueChange = (selected: SelectOption<Technique>[]) => {
        const selectedTechniqueValues = selected.map((option) => option.value);
        setSelectedTechniques(selectedTechniqueValues);
        setRobotData((prev) => ({ ...prev, techs: selectedTechniqueValues }));
    };

    const hexagonAttributes = Object.keys(robotData.hexagonValues) as Array<keyof RobotData['hexagonValues']>;

    useEffect(() => {
        const filterParts = parts.filter((part) => {
            const hasNoPrerequisite = !part.prerequisite || !Object.keys(part.prerequisite).length;
            const matchesClass = part.prerequisite?.class?.includes(filter.class);
            return hasNoPrerequisite || matchesClass;
        });

        const noRequisiteTechs = techs.filter((tech) => !tech.prerequisite);
        const classRequisiteTechs = techs.filter((tech) => tech.prerequisite?.class?.includes(filter.class));
        const typeMismatchTechs = classRequisiteTechs.filter((tech) => tech.prerequisite?.type && !tech.prerequisite.type.includes(filter.type));
        const filteredTechniques = [...noRequisiteTechs, ...classRequisiteTechs.filter((tech) => !typeMismatchTechs.includes(tech))];

        setFilteredParts(filterParts.map(mapToSelectOption));
        setFilteredTechniques(filteredTechniques.map(mapToSelectOption));
    }, [filter.class, filter.type]);

    const handleClassChange = (event: { target: { value: string; }; }) => {
        const selectedClass = robotClasses.find((rc) => rc.name === event.target.value);
        if (selectedClass) {
            setBaseHexagonValues(selectedClass.status);
            setRobotData((prev) => ({
                ...prev,
                class: selectedClass.name,
                description: selectedClass.description,
                hexagonValues: selectedClass.status,
            }));
            handleFilterChange('class', selectedClass.name);
        }
    };

    const handlePersonalityChange = (event: { target: { value: string; }; }) => {
        const selectedPersonality = robotPersonalities.find((rp) => rp.name.toLowerCase() === event.target.value.toLowerCase());
        if (selectedPersonality && baseHexagonValues) {
            setRobotData((prev) => ({
                ...prev,
                hexagonValues: {
                    durabilidade: baseHexagonValues.durabilidade + selectedPersonality.status.durabilidade,
                    dano: baseHexagonValues.dano + selectedPersonality.status.dano,
                    mira: baseHexagonValues.mira + selectedPersonality.status.mira,
                    velocidade: baseHexagonValues.velocidade + selectedPersonality.status.velocidade,
                    carapaca: baseHexagonValues.carapaca + selectedPersonality.status.carapaca,
                    bateria: baseHexagonValues.bateria + selectedPersonality.status.bateria,
                },
            }));
            handleFilterChange('personality', selectedPersonality.name);
        }
    };

    return (
        <div className="flex flex-col bg-orange-400 p-2 m-5 rounded-lg">
            <span className="text-white text-2xl font-bold">Dados do Cria</span>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                <InputBox blockSize onChange={(value) => handleInputChange("name", value)} label="Nome:" linkedFor="robot-name" height="h-8" />
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
                <SelectBox label="Tipo:" data={types} placeholder="Selecione o tipo" linkedFor="robot-type" onChange={(e) => handleFilterChange('type', e.target.value)} value={filter.type} />
                <SelectBox label="Rank:" data={ranks} placeholder="Qual seu rank?" linkedFor="robot-rank" onChange={(e) => handleFilterChange('rank', e.target.value)} value={filter.rank} />
            </div>

            {robotData.class && robotData.description && (
                <div className="text-white mt-4">
                    <p><strong>{robotData.class}:</strong> {robotData.description}</p>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-6">
                {hexagonAttributes.map((attribute) => (
                    <HexagonInput
                        key={attribute}
                        label={attribute.charAt(0).toUpperCase() + attribute.slice(1)}
                        value={robotData.hexagonValues[attribute]}
                        onChange={(e) => handleHexagonValueChange(attribute, Number(e.target.value))}
                    />
                ))}
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-stone-400 rounded-lg p-4">
                    <h3 className="text-white font-semibold">Peças</h3>
                    <Select
                        placeholder="Selecione as peças"
                        components={animatedComponents}
                        closeMenuOnSelect={false}
                        isMulti
                        onChange={(selected) => handlePartChange(selected as SelectOption<Part>[])}
                        options={filteredParts}
                    />

                    {selectedParts.length > 0 && (
                        <div className="bg-stone-400 rounded-lg mt-5 p-2">
                            <h4>Peças Selecionadas:</h4>
                            {selectedParts.map((part, index) => (
                                <div key={index} className="bg-white border my-2 p-2">
                                    <p><strong>Nome:</strong> {part.name}</p>
                                    <p><strong>Tipo:</strong> {part.type}</p>
                                    {part.location && <p><strong>Posição:</strong> {part.location}</p>}
                                    {part.memoryCost && <p><strong>Custo de memória:</strong> {part.memoryCost}</p>}
                                    {part.skill && <p><strong>{part.skill.name}:</strong> {part.skill.description}</p>}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="bg-stone-400 rounded-lg p-4">
                    <h3 className="text-white font-semibold">Técnicas</h3>
                    <Select
                        placeholder="Selecione as técnicas"
                        components={animatedComponents}
                        closeMenuOnSelect={false}
                        isMulti
                        onChange={(selected) => handleTechniqueChange(selected as SelectOption<Technique>[])}
                        options={filteredTechniques}
                    />
                    {selectedTechniques.length > 0 && (
                        <div className="bg-stone-400 rounded-lg mt-5 p-2">
                            <h4>Técnicas Selecionadas:</h4>
                            {selectedTechniques.map((tech, index) => (
                                <div key={index} className="bg-white border my-2 p-2">
                                    <p><strong>Nome:</strong> {tech.name}</p>
                                    <p><strong>Tipo:</strong> {tech.type}</p>
                                    <p><strong>Custo de bateria:</strong> {tech.battery}</p>
                                    <p><strong>Descrição:</strong> {tech.description}</p>
                                    
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
