type SelectBoxProps = {
    label: string;
    value?: string;
    linkedFor?: string;
    data: (string | number)[];
    placeholder?: string;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export default function SelectBox({
    label,
    linkedFor,
    data,
    placeholder = "Selecione uma opção",
    onChange,
    value = "",
}: SelectBoxProps) {
    return (
        <div className="flex flex-col py-1">
            <label className="text-white font-semibold" htmlFor={linkedFor}>
                {label}
            </label>
            <select
                onChange={onChange}
                value={value}
                className="h-8 rounded-lg bg-white text-black p-1"
                name={linkedFor}
                id={linkedFor}
            >
                <option value="" disabled>
                    {placeholder}
                </option>
                {data.map((viewData) => (
                    <option key={viewData.toString()} value={viewData}>
                        {viewData}
                    </option>
                ))}
            </select>
        </div>
    );
}
