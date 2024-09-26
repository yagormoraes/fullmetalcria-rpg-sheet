import { Children } from "@/types/children";
import InputBox from "../inputBox";

type ChildrenInputsProps = {
    children: Children | null
}

export default function ChildrenInputs({children}: ChildrenInputsProps) {
    return (
        <div className="flex flex-col bg-orange-400 p-2 m-5 rounded-lg">
            <span className="text-white text-2xl font-bold">Dados do Pivete</span>
            <div className="grid grid-cols-2 gap-3">
                <InputBox label="Nome:" linkedFor="children-name" height="h-6" />
                <InputBox
                    label="Classe do Pivete:"
                    height="h-6"
                    linkedFor="children-class"
                    value={children?.class || ""}
                    disable={true}
                />
            </div>
            <div className="grid grid-cols-3 gap-3">
                <InputBox
                    label="Seu quarto é:"
                    linkedFor="children-room"
                    placeholder={children?.room || ""}
                    height="h-20"
                />
                <InputBox
                    label="Objetos icônicos:"
                    linkedFor="children-object"
                    placeholder={children?.objects || ""}
                    height="h-20"
                />
                <InputBox
                    label={children?.unique ? children.unique.label : "Traço único:"}
                    linkedFor="children-unique"
                    placeholder={children?.unique?.values || ""}
                    height={children?.unique?.values?.length && children.unique.values.length > 140 ? "h-32" : "h-20"}
                />

            </div>
        </div>
    )
}