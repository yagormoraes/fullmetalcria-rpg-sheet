
type SelectPropsProps = {
    label: string;
    value?: string;
    linkedFor?: string;
    data: any[],
    placeholder?: string
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
};

export default function SelectBox({ label, linkedFor, data, placeholder, onChange }: SelectPropsProps) {
    return (
        <div className="flex flex-col py-1">
            <label className="text-white font-semibold" htmlFor={linkedFor}>{label}</label>
            <select onChange={onChange} className="rounded-lg" name={linkedFor} id={linkedFor}>
                <option value="" disabled selected>{placeholder}</option>
                {data.map((viewData) => {
                    return (
                        <option value={viewData.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}>{viewData}</option>
                    )
                })}
            </select>
        </div>
    )
}