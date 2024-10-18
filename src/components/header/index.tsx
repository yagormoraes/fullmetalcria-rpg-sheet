import Switch from "../switch"

type HeaderProps = {
    onToggleDarkMode: () => void;
  };

export default function Header({ onToggleDarkMode }: HeaderProps) {
    return (
        <header className="bg-zinc-300 h-20 flex justify-between items-center">
            <div className="flex items-center">
                <img className="ml-6 h-20 w-20" src="/assets/YRM.png" alt="logo-yago" />
                <img src="/assets/logo.png" alt="Logo" className="px-8 py-2 h-20 object-contain" />
            </div>
            <div>
                <div className="mr-6 h-20 w-20 flex justify-center items-center">
                    <Switch onToggle={onToggleDarkMode} />
                </div>
            </div>
        </header>
    )
}