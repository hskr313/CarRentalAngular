export type Customer = {
    id: number,
    firstname: string,
    lastname: string;
    address: {
        street: string,
        number: string,
        postalCode: string,
        city: string,
        country: string
    }
}