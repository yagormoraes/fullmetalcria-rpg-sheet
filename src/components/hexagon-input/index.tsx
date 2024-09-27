
type HexagonInputProps = {
    label: string
    value?: any,
    onChange: (e: any) => void
}

export default function HexagonInput({ label, value, onChange }: HexagonInputProps) {
    return (
        <div className="flex flex-col items-center justify-center border rounded-lg bg-stone-400">
            <label className="text-white font-semibold" htmlFor="">{label}</label>
            <div className="h-3" />
            <div className="relative w-40 h-40">
                <div className="hexagon-border">
                    <div className="hexagon-inner ">
                        <input
                            onChange={onChange}
                            type="number"
                            className="w-20 h-20 text-center text-3xl text-black rounded-lg no-arrows"
                            placeholder="0"
                            min={0}
                            value={value}
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}