export type Car = {
    id: number,
    buyPrice: number,
    buyDate: Date,
    km: number,
    supplier: string,
    repair: boolean,
    returnDate: Date,
    model: Model
}

export type Model ={
    brand: string,
    type: string,
    power: number,
    // pricingClass: PricingClass,
    options: Option[]
}

export type Option = {
    id:number,
    option: string
}
// export type CarDTO = {
//     id: number,
//     buyPrice: number,
//     buyDate: Date,
//     km: number,
//     supplier: string,
//     repair: boolean,
//     returnDate: Date,
//     model: modelDTO,
// }

// export type modelDTO = {
//     brand: string,
//     type: string,
//     power: number
//     options: string[]
// }