interface UniqueFeature {
    label: string,
    values: string
}

export interface Children extends UniqueFeature {
    class: string,
    img: string,
    altText: string,
    room: string,
    objects: string,
    unique: UniqueFeature
}