

export default function Footer() {
    return(
        <footer className="bg-zinc-300 h-20 flex justify-between">
            <div className="flex">
                <div className="ml-6 h-20 w-20 bg-slate-200" />
                <img src="/assets/logo.png" alt="Logo" className="pl-8 py-2 h-full w-auto max-h-full object-contain" />
                <img src="/assets/indievisivel-press-logo.png" alt="Logo" className="py-2 h-full w-auto max-h-full object-contain" />
            </div>
            <div>
                Links Uteis
            </div>
            <div>
                (A detalhar ainda) Sobre, FullMetalCria, Loja da IndievisivelPress
            </div>
        </footer>
    )
}