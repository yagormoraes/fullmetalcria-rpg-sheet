import Card from "../card";
import data from "../../data/children.json"

type SelectChildrenProps = {
    onSelectChildren: (children: any) => void
};

export default function SelectChildren({ onSelectChildren }: SelectChildrenProps) {
    return (
        <div className="flex flex-col bg-orange-400 p-2 m-5 rounded-lg">
            <span className="text-white text-2xl font-bold">Pivetes</span>
            <span className="text-white font-bold">Selecione somente um arquetipo de pivete.</span>
            <div className="flex overflow-x-auto space-x-4 p-2">
                {data.map((obj) => {
                    return(
                        <Card img={obj.img} overlayText={obj.class} altText={obj.altText} onClick={() => onSelectChildren(obj)} />
                    )
                })}
            </div>
        </div>
    );
}
