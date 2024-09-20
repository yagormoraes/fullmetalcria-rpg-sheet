type CardProps = {
    img: string;
    altText?: string;
    overlayText?: string;
};

export default function Card({ img, altText, overlayText }: CardProps) {
    return (
        <div className="relative bg-white w-48 rounded-lg overflow-hidden mx-1 my-2 [perspective: 1000px]">
            <img
                className="w-full h-full rounded-lg object-cover"
                src={img}
                alt={altText || "Card Image"}
            />
            {overlayText && (
                <div className="absolute bottom-0 w-full bg-black bg-opacity-50 text-center py-2">
                    <p className="text-white font-bold text-lg">{overlayText}</p>
                </div>
            )}
        </div>
    );
}
