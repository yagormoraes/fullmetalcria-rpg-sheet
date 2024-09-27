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

const animatedComponents = makeAnimated();

const types = ["Água", "Fogo", "Vento", "Terra", "Elétrico", "Neutro"];
const ranks = ["Nulo", "Latão", "Bronze", "Prata", "Ouro", "Full Metal"];

const techSelect = techs.map((tech) => ({ value: tech.name, label: tech.name }));
const partSelect = parts.map((part) => ({ value: part.name, label: part.name }))

export default function RobotInputs() {
    const [filter, setFilter] = useState({
        class: "",
        type: ""
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
            const typeMatch = technique?.prerequisite?.type ?  !technique.prerequisite.type.includes(filter.type) : false;
            return typeMatch 
        })

        const otherFilteredTechniques = filterRequireClassRequisite.filter(
            (technique) => !filterRequireTypeRequisite.includes(technique)
        );
        const filteredTechniques = [...filterNoRequireRequisite, ...otherFilteredTechniques]

        setFilteredParts(filteredParts);
        setFilteredTechniques(filteredTechniques);
    }, [filter.class, filter.type]);


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
        }
    };
    

    const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedType = event.target.value;
        setFilter((prev) => ({ ...prev, type: selectedType }));
    };

    const handlePersonalityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedPersonality = robotPersonalities.find(
            (rp) => rp.name.toLowerCase() === event.target.value.toLowerCase()
        );
    
        if (selectedPersonality) {
            // Calcular os novos valores com base nos valores baseHexagonValues
            setHexagonValues({
                durabilidade: baseHexagonValues.durabilidade + selectedPersonality.status.durabilidade,
                mira: baseHexagonValues.mira + selectedPersonality.status.mira,
                velocidade: baseHexagonValues.velocidade + selectedPersonality.status.velocidade,
                carapaca: baseHexagonValues.carapaca + selectedPersonality.status.carapaca,
                dano: baseHexagonValues.dano + selectedPersonality.status.dano,
                bateria: baseHexagonValues.bateria + selectedPersonality.status.bateria,
            });
        }
    };
    
    
    

    const handleHexagonValueChange = (attribute: string, newValue: number) => {
        setHexagonValues((prevValues) => ({
            ...prevValues,
            [attribute]: newValue
        }));
    };

    return (
        <div className="flex flex-col bg-orange-400 p-2 m-5 rounded-lg">
            <span className="text-white text-2xl font-bold">Dados do Cria</span>
            <div className="grid grid-cols-5 gap-3">
                <InputBox label="Nome:" linkedFor="robot-name" height="h-6" />
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
                />
                <SelectBox label="Tipo:" data={types} placeholder="Selecione o tipo" linkedFor="robot-type" onChange={handleTypeChange} />
                <SelectBox label="Rank:" data={ranks} placeholder="Qual seu rank?" linkedFor="robot-rank" />
            </div>
            <div className='text-white'>
                <div>{`${name} : ${description}`}</div>
            </div>
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
                    <div className="bg-stone-400 rounded-lg">
                        <span className="text-white font-semibold">Peças</span>
                        <Select placeholder="Selecione as peças" components={animatedComponents} closeMenuOnSelect={false} isMulti options={filteredParts.map((part: { name: any; }) => ({ value: part.name, label: part.name }))} />
                    </div>
                    <div className="bg-stone-400 rounded-lg">
                        <span className="text-white font-semibold">Técnicas</span>
                        <Select placeholder="Selecione as técnicas" components={animatedComponents} closeMenuOnSelect={false} isMulti options={filteredTechniques.map((tech: { name: any; }) => ({ value: tech.name, label: tech.name }))} />
                    </div>
                </div>
            </div>
        </div>
    );
}
