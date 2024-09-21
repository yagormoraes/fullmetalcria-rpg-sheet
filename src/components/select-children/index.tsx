import Card from "../card";

export default function SelectChildren() {
    return (
        <div className="flex flex-col bg-orange-400 p-2 m-5 rounded-lg">
            <span className="text-white text-2xl font-bold">Pivetes</span>
            <span className="text-white font-bold">Selecione somente um arquetipo de pivete.</span>
            <div className="flex overflow-x-auto space-x-4 p-2">
                <Card img="/assets/pivete-cafe-com-leite.png" overlayText="Café com Leite" altText="pivete-cafe-com-leite" />
                <Card img="/assets/pivete-ronin.png" overlayText="Ronin" altText="pivete-ronin"/>
                <Card img="/assets/pivete-rebelde.png" overlayText="Rebelde" altText="pivete-rebelde"/>
                <Card img="/assets/pivete-mascara.png" overlayText="Máscara" altText="pivete-mascara"/>
                <Card img="/assets/pivete-cerebro.png" overlayText="Cérebro" altText="pivete-cerebro" />
                <Card img="/assets/pivete-protetor.png" overlayText="Protetor" altText="pivete-protetor" />
                <Card img="/assets/pivete-blogueira.png" overlayText="Blogueira" altText="pivete-blogueira" />
                <Card img="/assets/pivete-esforcado.png" overlayText="Esforçado" altText="pivete-esforcado" />
                <Card img="/assets/pivete-playboy.png" overlayText="Playboy" altText="pivete-playboy" />
            </div>
        </div>
    );
}
