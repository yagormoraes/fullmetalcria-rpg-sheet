import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

interface PdfDownloadProps {
    children: any;
    childrenInputs?: any;
    robotInputs?: any;
}

export default function PdfDownload({ children}: PdfDownloadProps) {

    const contentRef = useRef(null)
    const handlePrint = useReactToPrint({ contentRef });
    return (
        <>
            <div className="bg-slate-400 mx-5">
                <button onClick={() => handlePrint()}>Click para baixar a ficha</button>
                <div ref={contentRef}>
                    <h1>Ficha do Personagem</h1>
                    <p><strong>Criança Selecionada:</strong> {JSON.stringify(children)}</p>

                </div>
            </div>
        </>
    );
}