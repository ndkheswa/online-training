export interface AuthRegisterDto {
    email: string;
    password: string;
    name: string;
    given_name: string;
    family_name: string;
}

export interface AuthCredentialsDto {
    password: string;
    name: string;
}