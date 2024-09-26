
type SelectPropsProps = {
    label: string;
    value?: string;
    linkedFor?: string;
    data: any[]
};

export default function SelectBox({ label, linkedFor, data }: SelectPropsProps) {
    return (
        <div className="flex flex-col py-1">
            <label className="text-white font-semibold" htmlFor={linkedFor}>{label}</label>
            <select className="rounded-lg" name={linkedFor} id={linkedFor}>
                {data.map((viewData) => {
                    return (
                        <option value={viewData.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}>{viewData}</option>
                    )
                })}
            </select>
        </div>
    )
}