export interface Client {
    id?: string
    firstName?: string;
    lastName?:string;
    mobile?: string;
    address?: string;
    loan?: Loan[]
}

export interface Loan {
    id?: string
    initialDate?: string;
    totalAmount?:string;
    profit?: string;
    cuoteType?: string;
    cuoteQuantity?: string;
    cuotePaid?: string;
    cuoteValue?: string;
}

