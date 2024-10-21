export default function Banner() {
    return (
        <div className="relative flex justify-center items-center overflow-hidden h-80 mx-5">
            <img
                className="opacity-70 rounded-lg object-cover object-center w-full h-full"
                src="/assets/banner-image.png"
                alt="Banner"
            />
            <div className="absolute inset-0 bg-orange-400 opacity-70 rounded-lg"></div>
            <div className="absolute bottom-0 left-0 m-4">
                <p className="text-white text-3xl font-bold">Olá Pivete!</p>
                <p className="text-white">
                    Este é um site não oficial na criação de Pivetes e Crias no sistema de Full Metal Cria.
                </p>
                <a
                    href="https://drive.google.com/file/d/14n-vLHQR-21xFY4yv3T7w_wHI_9ESRnt/view"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-700 transition"
                >
                    <div className="flex items-center space-x-2">
                        <p>BAIXE O FAST PLAY</p>
                        <img className="h-5" src="/assets/download.png" alt="Download" />
                    </div>
                </a>
            </div>
        </div>
    );
}
