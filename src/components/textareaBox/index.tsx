
type TextareaProps = {
    label: string;
    value?: string;
    linkedFor?: string;
    placeholder?: string;
    disable?: boolean;
    height?: string;
    onChange: (value: any) => void;
    disale?: boolean
    blockSize?: boolean
};


export default function TextareaBox({ label, linkedFor, height, value, onChange, placeholder, disable, blockSize }: TextareaProps) {
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(event.target.value);
    };
    return (
        <div className="flex flex-col py-1">
            <label className="text-white font-semibold" htmlFor={linkedFor}>{label}</label>
            
            <textarea 
                disabled={disable} 
                name={linkedFor} 
                onChange={handleChange}
                className={`rounded-lg resize-none ${height} disabled:bg-orange-100`} 
                id={linkedFor} 
                value={value} 
                placeholder={placeholder} />
        </div>
    );
};
