import { useState } from "react";

type InputProps = {
    label: string;
    value?: string;
    linkedFor?: string;
    placeholder?: string;
    disable?: boolean
    height?: string
};



export default function InputBox({ label, linkedFor, value, placeholder, disable, height }: InputProps) {
    const [input, setInput] = useState("")

    const onChangeValue = (value: any) =>{
        setInput(value)
    }
    
    return (
        <div className="flex px-2 flex-col py-1">
            <label className="text-white font-semibold" htmlFor={linkedFor}>{label}</label>
            <textarea disabled={disable} name={linkedFor} onChange={(e) => onChangeValue(e.target.value)} className={`rounded-lg resize-none ${height} disabled:bg-orange-100`} id={linkedFor} value={value} placeholder={placeholder} />
        </div>
    )
}