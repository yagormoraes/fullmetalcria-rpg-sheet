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

    const [filteredParts, setFilteredParts] = useState([]);
    const [filteredTechniques, setFilteredTechniques] = useState([]);
    const [selectedParts, setSelectedParts] = useState([]);
    const [selectedTechniques, setSelectedTechniques] = useState([]);

    const { robotData, setRobotData } = useAppContext();

    const handleFilterChange = (key, value) => {
        setFilter((prev) => ({ ...prev, [key]: value }));
        setRobotData((prev) => ({ ...prev, [key]: value }));
    };

    const handleHexagonValueChange = (attribute, newValue) => {
        setRobotData((prev) => ({
            ...prev,
            hexagonValues: {
                ...prev.hexagonValues,
                [attribute]: newValue,
            },
        }));
    };

    const handlePartChange = (selected) => {
        setSelectedParts(selected);
        setRobotData((prev) => ({ ...prev, parts: selected }));
    };

    const handleTechniqueChange = (selected) => {
        setSelectedTechniques(selected);
        setRobotData((prev) => ({ ...prev, techs: selected }));
    };

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

        setFilteredParts(filterParts);
        setFilteredTechniques(filteredTechniques);
    }, [filter.class, filter.type]);

    const handleClassChange = (event: { target: { value: string; }; }) => {
        const selectedClass = robotClasses.find((rc) => rc.name === event.target.value);
        if (selectedClass) {
            setRobotData((prev) => ({
                ...prev,
                name: selectedClass.name,
                description: selectedClass.description,
                hexagonValues: selectedClass.status, 
            }));
            handleFilterChange('class', selectedClass.name);
        }
    };

    const handlePersonalityChange = (event: { target: { value: string; }; }) => {
        const selectedPersonality = robotPersonalities.find((rp) => rp.name.toLowerCase() === event.target.value.toLowerCase());
        if (selectedPersonality) {
            setRobotData((prev) => ({
                ...prev,
                hexagonValues: {
                    durabilidade: prev.hexagonValues.durabilidade + selectedPersonality.status.durabilidade,
                    dano: prev.hexagonValues.dano + selectedPersonality.status.dano,
                    mira: prev.hexagonValues.mira + selectedPersonality.status.mira,
                    velocidade: prev.hexagonValues.velocidade + selectedPersonality.status.velocidade,
                    carapaca: prev.hexagonValues.carapaca + selectedPersonality.status.carapaca,
                    bateria: prev.hexagonValues.bateria + selectedPersonality.status.bateria,
                },
            }));
            handleFilterChange('personality', selectedPersonality.name);
        }
    };

    return (
        <div className="flex flex-col bg-orange-400 p-2 m-5 rounded-lg">
            <span className="text-white text-2xl font-bold">Dados do Cria</span>

            <div className="grid grid-cols-5 gap-3">
                <InputBox blockSize onChange={(value) => handleFilterChange("name", value)} label="Nome:" linkedFor="robot-name" height="h-8" />
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

            {robotData.name && robotData.description && (
                <div className="text-white mt-4">
                    <p><strong>{robotData.name}:</strong> {robotData.description}</p>
                </div>
            )}

            <div className="grid grid-cols-3 gap-3 mt-6">
                {Object.keys(robotData.hexagonValues).map((attribute) => (
                    <HexagonInput
                        key={attribute}
                        label={attribute.charAt(0).toUpperCase() + attribute.slice(1)}
                        value={robotData.hexagonValues[attribute]}
                        onChange={(e) => handleHexagonValueChange(attribute, Number(e.target.value))}
                    />
                ))}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-6">
                <div className="bg-stone-400 rounded-lg p-4">
                    <h3 className="text-white font-semibold">Peças</h3>
                    <Select
                        placeholder="Selecione as peças"
                        components={animatedComponents}
                        closeMenuOnSelect={false}
                        isMulti
                        onChange={handlePartChange}
                        options={filteredParts.map((part) => ({ value: part, label: part.name }))}
                    />
                    {selectedParts.length > 0 && (
                        <div className="bg-stone-400 rounded-lg mt-5 p-2">
                            <h4>Peças Selecionadas:</h4>
                            {selectedParts.map((part, index) => (
                                <div key={index} className="bg-white border my-2 p-2">
                                    <p><strong>Nome:</strong> {part.label}</p>
                                    <p><strong>Tipo:</strong> {part.value.type}</p>
                                    {part.value.position && <p><strong>Posição:</strong> {part.value.position}</p>}
                                    {part.value.memoryCost && <p><strong>Custo de memória:</strong> {part.value.memoryCost}</p>}
                                    {part.value.skill && <p><strong>{part.value.skill.name}:</strong> {part.value.skill.description}</p>}
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
                        onChange={handleTechniqueChange}
                        options={filteredTechniques.map((tech) => ({ value: tech, label: tech.name }))}
                    />
                    {selectedTechniques.length > 0 && (
                        <div className="bg-stone-400 rounded-lg mt-5 p-2">
                            <h4>Técnicas Selecionadas:</h4>
                            {selectedTechniques.map((tech, index) => (
                                <div key={index} className="bg-white border my-2 p-2">
                                    <p><strong>Nome:</strong> {tech.label}</p>
                                    <p><strong>Tipo:</strong> {tech.value.type}</p>
                                    <p><strong>Custo de bateria:</strong> {tech.value.battery}</p>
                                    <p><strong>Descrição:</strong> {tech.value.description}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
