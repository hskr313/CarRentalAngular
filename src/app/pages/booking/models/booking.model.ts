import { Car } from "../../car/model/car.model"
import { Customer } from "../../customer/models/customer.model"

export type Booking = {
    id: number,
    removal : Date,
    theoricRestitution: Date,
    restitution: Date,
    reservStatus: string,
    substitution: Booking,
    customer : Customer,
    // rentalFormula: rentalFormula,
    cancellationDate: Date,
    closingDate: Date,
    finDeleted: number,
    indicativePrice: number,
    car: Car
}