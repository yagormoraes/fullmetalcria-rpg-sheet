type CardProps = {
    img: string;
    altText?: string;
    overlayText?: string;
};

export default function Card({ img, altText, overlayText }: CardProps) {
    return (
        <div className="group h-40 w-40 min-w-[10rem] ">
            <div className="relative h-full w-full rounded-xl shadow-xl">

                <div className="absolute inset-0 ">
                    <img
                        className="h-full w-full rounded-xl object-cover shadow-xl shadow-black/40"
                        src={img}
                        alt={altText || "Card Image"}
                    />
                    {overlayText && (
                        <div className="absolute bottom-0 w-full rounded-b-xl bg-black bg-opacity-50 text-center py-2">
                            <p className="text-white font-bold text-lg">{overlayText}</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
