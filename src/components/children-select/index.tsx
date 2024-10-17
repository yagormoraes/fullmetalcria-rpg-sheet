import Card from "../card";
import data from "../../data/children.json";
import InputBox from "../inputBox";
import { useState } from "react";
import { useAppContext } from "@/context/appProvider";

export default function ChildrenSelect() {
    const { childrenData, setChildrenData } = useAppContext();
    const [placeholders, setPlaceholders] = useState({
        room: "",
        objects: "",
        uniqueValue: "",
    });

    const handleInputChange = (name: string, value: string) => {
        setChildrenData((prev: any) => ({
          ...prev,
          [name]: value,
        }));
      };

    const handleCardSelect = (selectedClass: string, label: string, room: string, objects: string, values: string) => {
        setChildrenData((prev: { unique: any; }) => ({
            ...prev,
            class: selectedClass, 
            unique: { ...prev.unique, label }, 
        }));

        setPlaceholders({
            room,
            objects,
            uniqueValue: values,
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
                            onClick={() => handleCardSelect(obj.class, obj.unique.label, obj.room, obj.objects, obj.unique.values)}
                        />
                    ))}
                </div>
            </div>
            <div className="flex flex-col bg-orange-400 p-2 m-5 rounded-lg">
                <span className="text-white text-2xl font-bold">Dados do Pivete</span>
                <div className="grid grid-cols-2 gap-3">
                    <InputBox
                        label="Nome:"
                        linkedFor="children-name"
                        height="h-6"
                        blockSize
                        onChange={(value: string) => handleInputChange("name", value)}
                    />
                    <InputBox
                        label="Classe do Pivete:"
                        height="h-6"
                        linkedFor="children-class"
                        blockSize
                        value={childrenData.class}
                        disable={true}
                        onChange={(value: string) => handleInputChange("class", value)}
                    />
                </div>
                <div className="grid grid-cols-3 gap-3">
                    <InputBox
                        label="Seu quarto é:"
                        linkedFor="children-room"
                        height="h-20"
                        blockSize
                        placeholder={placeholders.room}
                        onChange={(value: string) => handleInputChange("room", value)}
                    />
                    <InputBox
                        label="Objetos icônicos:"
                        linkedFor="children-object"
                        height="h-20"
                        blockSize
                        placeholder={placeholders.objects} 
                        onChange={(value: string) => handleInputChange("objects", value)}
                    />
                    <InputBox
                        label={`${childrenData.unique.label}:`}
                        linkedFor="children-unique"
                        placeholder={placeholders.uniqueValue}
                        height={
                            childrenData?.unique?.values?.length && childrenData.unique.values.length > 140
                                ? "h-24"
                                : "h-20"
                        }
                        onChange={(value: any) =>
                            setChildrenData((prev: { unique: any; }) => ({
                                ...prev,
                                unique: { ...prev.unique, values: value },
                            }))
                        }
                    />
                </div>
            </div>
        </>
    );
}
