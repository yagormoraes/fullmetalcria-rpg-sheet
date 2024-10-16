
type InputProps = {
    label: string;
    value?: string;
    linkedFor?: string;
    placeholder?: string;
    disable?: boolean;
    height?: string;
    onChange: (value: string) => void;
    disale?: boolean
    blockSize?: boolean
};


export default function InputBox({ label, linkedFor, height, value, onChange, placeholder, disable, blockSize }: InputProps) {
    const handleChange = (event: { target: { value: any; }; }) => {
        const newValue = event.target.value;
        onChange(newValue);
    };

    return (
        <div className="flex flex-col py-1">
            <label className="text-white font-semibold" htmlFor={linkedFor}>{label}</label>
            
            <textarea 
                disabled={disable} 
                name={linkedFor} 
                onChange={handleChange}
                className={`rounded-lg ${blockSize ? "resize-none": ""} ${height} disabled:bg-orange-100`} 
                id={linkedFor} 
                value={value} 
                placeholder={placeholder} />
        </div>
    );
};
