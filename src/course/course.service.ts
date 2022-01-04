import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { CourseDto } from 'src/Dtos/course-dto';
import { UserDto } from 'src/Dtos/user-dto';
import { Course } from 'src/entities/course.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CourseService {
    
    constructor(@InjectRepository(Course) private readonly courseRepo: Repository<Course>, 
        @InjectRepository(User) private readonly userRepo: Repository<User>, private authService: AuthService) {}

    public async getAll(): Promise<CourseDto[]> {
        return await this.courseRepo.find()
        .then(items => items.map(e => CourseDto.fromEntity(e)));
    }

    public async getUserCourses(userId: string): Promise<CourseDto> {
        const user =  await this.userRepo.findOne({ where: {id: userId}, relations: ['courses']});
        return CourseDto.fromEntity(user.courses[0]);
    }

    findUser(id: any): Promise<User> {
        const user = this.userRepo.findOne(id);

        if (user === undefined) {
            throw new NotFoundException(`User with ID: ${id} not found!`);
        }
        return user;
    }

    public async findUserByEmail(email: string): Promise<User> {
        const user = this.userRepo.findOne({ where: {email: email }});
        if (user === undefined) {
            throw new NotFoundException(`User with EMAIL: ${email} not found!`);
        }

        return user;
    }

    public async create(courses: Course[], dto: UserDto): Promise<UserDto> {
        const user = await this.findUserByEmail(dto.email);

        if (user !== undefined) {
            throw new BadRequestException(`User with EMAIL: ${user.email} already exists!`);
        }

        const client = UserDto.from(dto);           // creating a dto object
        client.id = await this.authService.register(dto);
        return await this.userRepo.save(client.toEntity(courses))
        .then(e => UserDto.fromEntity(e));
        
    }

    updateCourse(id: string) {

    }
}
