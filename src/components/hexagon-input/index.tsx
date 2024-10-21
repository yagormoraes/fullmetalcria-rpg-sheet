type HexagonInputProps = {
    label: string;
    value?: string | number | undefined;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };

export default function HexagonInput({ label, value, onChange }: HexagonInputProps) {
    return (
        <div className="flex flex-col items-center justify-center bg-stone-400 p-4 rounded-lg">
            <label className="text-white font-semibold mb-4">{label}</label>

            <div className="clip-block">
                <div className="clip-each clip-border">
                    <input
                        onChange={onChange}
                        type="number"
                        className="clip-caption w-20 h-20 text-center text-3xl text-black bg-transparent no-arrows focus:outline-none" 
                        min={0}
                        value={value}
                    />
                </div>
            </div>
            
        </div>
    )
}
