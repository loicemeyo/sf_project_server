export interface UserAccount {
    phone: number;
    email: string;
    password: string;
    role: string;
    isAuthenticated: boolean;
}

export interface RawUserAccount extends UserAccount {
    id: number
}