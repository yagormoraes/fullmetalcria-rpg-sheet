import Card from "../card";
import data from "../../data/children.json";
import InputBox from "../inputBox";
import { useState } from "react";
import { ChildrenData, Power, Special, useAppContext, Weakness } from "@/context/appProvider";
import TextareaBox from "../textareaBox";

export default function ChildrenSelect() {
    const { childrenData, setChildrenData } = useAppContext();
    const [placeholders, setPlaceholders] = useState({
        room: "",
        objects: "",
        uniqueValue: "",
        powers: [] as Power[],
        weaknesses: [] as Weakness[],
        special: [] as Special[],
        bonds: ""
    });

    const handleInputChange = (name: keyof ChildrenData, value: string) => {
        setChildrenData((prev) => {
            if (name === 'name' || name === 'class' || name === 'room' || name === 'objects' || name === 'bonds') {
                return { ...prev, [name]: value };
            }
            return prev;
        });
    };

    const handleCardSelect = (
        selectedClass: string,
        label: string,
        room: string,
        objects: string,
        values: string,
        powers: Power[],
        weaknesses: Weakness[],
        special: Special[],
        bonds: string
    ) => {
        setChildrenData((prev: ChildrenData) => ({
            ...prev,
            class: selectedClass,
            unique: { ...prev.unique, label },
            powers,
            weaknesses,
            special,
            bonds
        }));

        setPlaceholders({ room, objects, uniqueValue: values, powers, weaknesses, special, bonds });
    };

    const handleEditableChange = (index: number, section: keyof ChildrenData, value: string) => {
        setChildrenData((prev: ChildrenData) => {
            const updatedSection = [...(prev[section] as Power[] | Weakness[] | Special[])];
            updatedSection[index].description = value;
            return { ...prev, [section]: updatedSection };
        });
    };

    return (
        <>
            <div className="flex flex-col bg-orange-400 p-2 m-5 rounded-lg">
                <span className="text-white text-2xl font-bold">Pivetes</span>
                <span className="text-white font-bold">Selecione somente um arquetipo de pivete.</span>
                <div className="flex overflow-x-auto space-x-4 p-2">
                    {data.map((obj) => (
                        <Card
                            key={obj.class}
                            img={obj.img}
                            overlayText={obj.class}
                            altText={obj.altText}
                            onClick={() => handleCardSelect(obj.class, obj.unique.label, obj.room, obj.objects, obj.unique.values, obj.powers, obj.weaknesses, obj.special, obj.bonds)}
                        />
                    ))}
                </div>
            </div>

            <div className="flex flex-col bg-orange-400 p-2 m-5 rounded-lg">
                <span className="text-white text-2xl font-bold">Dados do Pivete</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <InputBox
                        label="Nome:"
                        linkedFor="children-name"
                        height="h-8"
                        blockSize
                        onChange={(value: string) => handleInputChange("name", value)}
                    />
                    <InputBox
                        label="Classe do Pivete:"
                        height="h-8"
                        linkedFor="children-class"
                        blockSize
                        value={childrenData.class}
                        disable={true}
                        onChange={(value: string) => handleInputChange("class", value)}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <TextareaBox
                        label="Seu quarto é:"
                        linkedFor="children-room"
                        height="h-20"
                        placeholder={placeholders.room}
                        onChange={(value: string) => handleInputChange("room", value)}
                    />
                    <TextareaBox
                        label="Objetos icônicos:"
                        linkedFor="children-object"
                        height="h-20"
                        placeholder={placeholders.objects}
                        onChange={(value: string) => handleInputChange("objects", value)}
                    />
                    <TextareaBox
                        label={`${childrenData.unique.label}:`}
                        linkedFor="children-unique"
                        placeholder={placeholders.uniqueValue}
                        height={childrenData?.unique?.values?.length > 140 ? "h-24" : "h-20"}
                        onChange={(value: string) =>
                            setChildrenData((prev: ChildrenData) => ({ ...prev, unique: { ...prev.unique, values: value } }))
                        }
                    />
                </div>

                <div className="mt-2 grid grid-cols-1 gap-4">
                    <div>
                        <h2 className="font-bold text-white">Poderes:</h2>
                        <div className="bg-orange-300 h-auto grid grid-cols-1 md:grid-cols-3 gap-4 rounded-md">
                            {childrenData.powers.map((power: Power, index: number) => (
                                <div key={index} className="rounded-lg">
                                    <TextareaBox
                                        label={power.name}
                                        linkedFor="children-powers"
                                        height="h-auto"
                                        placeholder={power.description}
                                        onChange={(e) => handleEditableChange(index, "powers", e)}
                                        disable
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="font-bold text-white">Fraquezas:</h2>
                        <div className="bg-orange-300 h-auto grid grid-cols-1 md:grid-cols-2 gap-4 rounded-md">
                            {childrenData.weaknesses.map((weakness: Weakness, index: number) => (
                                <div key={index} className="rounded-lg">
                                    <TextareaBox
                                        label={weakness.name}
                                        linkedFor="children-weakness"
                                        height="h-auto"
                                        placeholder={weakness.description}
                                        onChange={(e) => handleEditableChange(index, "weaknesses", e)}
                                        disable
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="font-bold text-white">Especial:</h2>
                        <div className="bg-orange-300 h-auto rounded-md">
                            {childrenData.special.map((special: Special, index: number) => (
                                <div key={index} className="rounded-lg mb-2">
                                    <TextareaBox
                                        label={special.name}
                                        linkedFor="children-special"
                                        height="h-auto"
                                        placeholder={special.description}
                                        onChange={(e) => handleEditableChange(index, "special", e)}
                                        disable
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="font-bold text-white">Vínculos:</h2>
                        <TextareaBox
                            linkedFor="children-bonds"
                            height="h-auto"
                            placeholder={childrenData.bonds}
                            onChange={(value: string) => handleInputChange("bonds", value)}
                            label=""
                        />
                    </div>
                </div>

            </div>
        </>
    );
}

