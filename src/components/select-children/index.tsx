import Card from "../card";

export default function SelectChildren() {
    return (
        <div className="flex flex-col bg-orange-400 p-2 m-5 rounded-lg">
            <span className="text-white text-2xl font-bold">Pivetes</span>
            <span className="text-white font-bold">Selecione somente um arquetipo de pivete.</span>
            <div className="flex">
                <Card img="/assets/pivete-cafe-com-leite.png" overlayText="Café com Leite" />
                <Card img="/assets/pivete-ronin.png" overlayText="Ronin"/>
                <Card img="/assets/pivete-rebelde.png" overlayText="Rebelde"/>
                <Card img="/assets/pivete-mascara.png" overlayText="Máscara"/>
                <Card img="/assets/pivete-cerebro.png" overlayText="Cérebro"/>
                <Card img="/assets/pivete-protetor.png" overlayText="Protetor"/>
                <Card img="/assets/pivete-blogueira.png" overlayText="Blogueira"/>
                <Card img="/assets/pivete-esforcado.png" overlayText="Esforçado"/>
                <Card img="/assets/pivete-playboy.png" overlayText="Playboy"/>
                
            </div>

        </div>
    );
}
