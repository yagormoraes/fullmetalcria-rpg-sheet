
type HexagonProps = {
    value: number
}

export default function Hexagon({value}: HexagonProps) {
    return (
        <div className="wrap">

            <div className="clip-block">
                <div className="clip-each clip-border">
                    <div className="clip-caption">{value}</div>
                </div>
            </div>

            <svg className="clip-svg">
                <defs>
                    <clipPath id="hexagon-clip" clipPathUnits="objectBoundingBox">
                        <polygon points="0.25 0.05, 0.75 0.05, 1 0.5, 0.75 0.95, 0.25 0.95, 0 0.5" />
                    </clipPath>
                </defs>
            </svg>
        </div>
    )
}