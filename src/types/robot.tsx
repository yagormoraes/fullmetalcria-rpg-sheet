export interface Robot {
    name: string
    description: string
    status: {
        durabilidade: number
        mira: number
        velocidade: number
        carapaca: number
        dano: number
        bateria: number
    }

}