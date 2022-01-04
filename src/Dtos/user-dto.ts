import { IsArray, IsEmail, IsString } from "class-validator";
import { AuthService } from "src/auth/auth.service";
import { Course } from "src/entities/course.entity";
import { User } from "src/entities/user.entity";

export class UserDto {

    constructor() {}

    @IsString()
    id: string;

    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    given_name: string;

    @IsString()
    family_name: string;

    @IsArray()
    courses: Course[];

    public static from(dto: Partial<UserDto>) {
        const it = new UserDto();
        it.id = dto.id;
        it.name = dto.name;
        it.email = dto.email;
        it.given_name = dto.given_name;
        it.family_name = dto.family_name;
        it.courses = dto.courses;
        return it;
    }

    public static fromEntity(entity: User) {
        return this.from({
            id: entity.id,
            email: entity.email,
            given_name: entity.given_name,
            family_name: entity.family_name,
            courses: entity.courses
        })
    }

    public toEntity(courses: Course[] = null) {
        const it = new User();
        it.id = this.id;
        it.name = this.name;
        it.email = this.email;
        it.given_name = this.given_name;
        it.family_name = this.family_name;
        it.courses = this.courses;
        return it;
    }
}

export class LoginDto {

    @IsString()
    name: string;
    
    password: string;
}