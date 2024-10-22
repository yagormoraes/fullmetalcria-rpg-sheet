import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-zinc-300 h-auto flex flex-col md:flex-row md:justify-between items-center p-4">
            <div className="flex flex-col md:flex-row items-center mb-4 md:mb-0 flex-wrap">
                <img className="ml-0 md:ml-6 h-16 w-16 md:h-20 md:w-20 mb-4 md:mb-0" src="/assets/YRM.webp" alt="logo-yago" />
                <img src="/assets/logo.webp" alt="Logo" className="h-16 md:h-20 object-contain px-4 mb-4 md:mb-0" />
                <img src="/assets/indievisivel-press-logo.webp" alt="Logo Indievisivel" className="h-16 md:h-20 object-contain mb-4 md:mb-0" />
            </div>
            <div className="flex flex-col items-center md:items-end md:mr-6">
                <p className="font-bold text-lg">Links Úteis</p>
                <ul className="list-none space-y-1 text-center md:text-right">
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
