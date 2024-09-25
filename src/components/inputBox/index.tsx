type InputProps = {
    label: string;
    value?: string;
    placeholder?: string;
};



export default function InputBox({ label, value, placeholder }: InputProps) {
    return (
        <div className="flex px-2 flex-col py-1">
            <label className="text-white font-semibold" htmlFor={value}>{label}</label>
            <input className="rounded-lg" id={value} type="text" placeholder={placeholder} />
        </div>
    )
}