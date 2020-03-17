export interface User {
    userId: string;
    creator?: boolean;
    admin?: boolean;
}
export interface UserWidthName extends User {
    firstName: String;
    lastName: String;
}
