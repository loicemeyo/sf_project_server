export interface UserAccount {
    phone: number;
    email: string;
    password: string;
}

export interface RawUserAccount extends UserAccount {
    id: number
}