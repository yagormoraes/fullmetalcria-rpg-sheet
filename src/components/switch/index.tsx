
type SwitchProps = {
    onToggle: () => void;
};

export default function Switch({ onToggle }: SwitchProps) {
    return (
        <>
            <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" onChange={onToggle} className="sr-only peer" />
                <div className="relative w-11 h-6 bg-yellow-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-900"></div>
            </label>
        </>
    );
}
