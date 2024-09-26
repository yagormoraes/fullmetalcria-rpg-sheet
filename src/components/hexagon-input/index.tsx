

export default function HexagonInput() {
    return (
        <>
            <label htmlFor="">Nome</label>
            <div className="hexagon-wrapper">
                <div className="hexagon-border" />
                <div className="hexagon-inner flex items-center justify-center">
                    <input
                        type="number"
                        className="w-16 h-10 text-center text-black rounded-lg no-arrows"
                        placeholder="0"
                        min={0}
                    />
                </div>
            </div>
        </>
    )
}