import Switch from "../switch"

type HeaderProps = {
    onToggleDarkMode: () => void;
  };

export default function Header({ onToggleDarkMode }: HeaderProps) {
    return (
        <header className="bg-zinc-300 h-20 flex justify-between">
            <div className="flex">
                <div className="ml-6 h-20 w-20 bg-slate-200" />
                <img src="/assets/logo.png" alt="Logo" className="pl-8 py-2 h-full w-auto max-h-full object-contain" />
            </div>
            <div>
                <div className="mr-6 h-20 w-20 flex justify-center items-center">
                    <Switch onToggle={onToggleDarkMode} />
                </div>
            </div>
        </header>
    )
}