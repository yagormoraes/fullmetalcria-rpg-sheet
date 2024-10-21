import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-zinc-300 h-45 flex flex-col md:flex-row justify-between items-center p-4">
            <div className="flex items-center mb-4 md:mb-0">
                <img className="ml-6 h-20 w-20" src="/assets/YRM.png" alt="logo-yago" />
                <img src="/assets/logo.png" alt="Logo" className="px-4 h-20 object-contain" />
                <img src="/assets/indievisivel-press-logo.png" alt="Logo Indievisivel" className="h-20 object-contain" />
            </div>
            <div className="mr-6">
                <p className="font-bold">Links Úteis</p>
                <ul className="list-none space-y-1">
                    <li>
                        <Link href="/About">
                            Sobre
                        </Link>
                    </li>
                    <li>
                        <a href="https://www.instagram.com/fullmetalcria">
                            Full Metal Cria
                        </a>
                    </li>
                    <li>
                        <a href="https://indievisivelpress.com.br/produto/fmcpre/">
                            Loja da IndieVisivel Press
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    );
}
