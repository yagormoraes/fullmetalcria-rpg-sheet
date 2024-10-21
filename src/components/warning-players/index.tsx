export default function WarningPlayers() {
    return (
        <div className="flex flex-col bg-orange-400 p-2 m-5 rounded-lg">
            <span className="text-white text-2xl font-bold">Atenção Jogadores e Mestres!</span>
            <span className="text-white font-bold">Para jogar com as regras completas, é preciso ter o livro do jogo.</span>
            <div className="text-white pt-2 pb-1">
                <span>Nesse site, o que está disponível é somente o link do Fast Play.</span>
            </div>
            <div className="text-white pt-1 pb-2">
                <span>A ficha de cria/pivete está atualmente em fase de testes e por conta disso, erros e bugs podem ocorrer. Preencha a ficha, na sequência, até o final. Se você encontrar qualquer tipo de erro, por favor, entre em contato conosco através do email <span className="font-bold">yago.dmoraes@gmail.com.</span></span>
            </div>
            <span className="text-white">Full Metal Cria é um sistema brasileiro de RPG produzido pela <a className="font-bold" href="https://indievisivelpress.com.br">Indievisivel Press.</a></span>
        </div>
    )
}