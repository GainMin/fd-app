export interface IGood {
    id?: number
    name: string
    price: number
    type: 'food' | 'drink'
}

export interface IFood extends IGood {
    mass: number
    isVegan: boolean
}

export interface IDrink extends IGood{
    volume: number
    containsAlcohol: boolean
}

export interface IGoodsTableProps{
    status: "error" | "success" | "loading"
    data: Good[]
    columns: any
    onEdit: Function
}

export type Good = IFood | IDrink;

