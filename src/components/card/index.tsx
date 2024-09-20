type CardProps = {
    img: string;
    altText?: string;
    overlayText?: string;
};

export default function Card({ img, altText, overlayText }: CardProps) {
    return (
        <div className="group h-40 w-40 [perspective:1000px]">
            <div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                <div className="absolute inset-0">
                    <img className="h-full w-full rounded-xl object-cover shadow-xl shadow-black/40" src={img} alt={altText || "Card Image"} />
                </div>
                {overlayText && (
                    <div className="absolute bottom-0 w-full bg-black bg-opacity-50 text-center py-2">
                        <p className="text-white font-bold text-lg">{overlayText}</p>
                    </div>
                )}
                <div className="absolute inset-0 h-full w-full rounded-xl bg-black/40 px-12 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                    Testando 123
                </div>
            </div>
        </div>
    );
}
