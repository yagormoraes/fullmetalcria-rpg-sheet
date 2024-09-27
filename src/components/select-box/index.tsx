
type SelectPropsProps = {
    label: string;
    value?: string;
    linkedFor?: string;
    data: any[],
    placeholder?: string
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
};

export default function SelectBox({ label, linkedFor, data, placeholder, onChange, value }: SelectPropsProps) {
    return (
        <div className="flex flex-col py-1">
            <label className="text-white font-semibold" htmlFor={linkedFor}>{label}</label>
            <select
                onChange={onChange}
                value={value}
                className="rounded-lg"
                name={linkedFor}
                id={linkedFor}
            >
                <option value="" disabled>{placeholder}</option>
                {data.map((viewData) => (
                    <option key={viewData} value={viewData}>{viewData}</option>
                ))}
            </select>
        </div>
    );
}
