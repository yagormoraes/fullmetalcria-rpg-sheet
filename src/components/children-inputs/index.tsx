import { Children } from "@/types/children";
import InputBox from "../inputBox";
import { useState, useEffect } from "react";

type ChildrenInputsProps = {
    children: Children | null;
    onChange: (data: any) => void; 
};

export default function ChildrenInputs({ children, onChange }: ChildrenInputsProps) {
    const [childrenData, setChildrenData] = useState({
        name: "",
        class: children?.class || "",
        room: "",
        objects: "",
        unique: {
            label: children?.unique?.label || "Traço único",
            values: "",
        },
    });

    const handleInputChange = (name: string, value: string) => {
        setChildrenData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    return (
        <div className="flex flex-col bg-orange-400 p-2 m-5 rounded-lg">
            <span className="text-white text-2xl font-bold">Dados do Pivete</span>
            <div className="grid grid-cols-2 gap-3">
                <InputBox
                    label="Nome:"
                    linkedFor="children-name"
                    height="h-6"
                    onChange={(value) => handleInputChange("name", value)}
                />
                <InputBox
                    label="Classe do Pivete:"
                    height="h-6"
                    linkedFor="children-class"
                    value={childrenData.class}
                    disable={true}
                    onChange={(value) => handleInputChange("class", value)}
                />
            </div>
            <div className="grid grid-cols-3 gap-3">
                <InputBox
                    label="Seu quarto é:"
                    linkedFor="children-room"
                    placeholder={children?.room || ""}
                    height="h-20"
                    onChange={(value) => handleInputChange("room", value)}
                />
                <InputBox
                    label="Objetos icônicos:"
                    linkedFor="children-object"
                    placeholder={children?.objects || ""}
                    height="h-20"
                    onChange={(value) => handleInputChange("objects", value)}
                />
                <InputBox
                    label={`${childrenData.unique.label}:`}
                    linkedFor="children-unique"
                    placeholder={children?.unique?.values || ""}
                    height={
                        children?.unique?.values?.length && children.unique.values.length > 140
                            ? "h-32"
                            : "h-20"
                    }
                    onChange={(value) =>
                        setChildrenData((prev) => ({
                            ...prev,
                            unique: { ...prev.unique, values: value },
                        }))
                    }
                />
            </div>
        </div>
    );
}
