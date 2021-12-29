import { IsEmail, IsString } from "class-validator";

export class RegisterUserDto {

    @IsEmail()
    email: string;
    password: string;

    @IsString()
    name: string;

    @IsString()
    given_name: string;

    @IsString()
    family_name: string;
}

export class LoginDto {

    password: string;

    @IsString()
    name: string;
}