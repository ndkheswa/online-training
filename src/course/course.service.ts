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
        return CourseDto.fromEntity(user.courses[2]);
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

    public async create(dto: UserDto): Promise<UserDto> {
        const user = await this.findUserByEmail(dto.email);

        if (user !== undefined) {
            throw new BadRequestException(`User with EMAIL: ${user.email} already exists!`);
        }

        const client = UserDto.from(dto);           // creating a dto object
        client.id = await this.authService.register(dto);
        return await this.userRepo.save(client)
        .then(e => UserDto.fromEntity(e));
        
    }

    public async createCourse(dto: CourseDto) {
        const course = CourseDto.from(dto);
        return await this.courseRepo.save(course)
        .then(e => CourseDto.fromEntity(e));
    }

    public async updateCourse(id: string, course: Course) {
        const user = await this.userRepo.findOneOrFail(id, { relations: ['courses']});
        user.courses.push(course);
        //const dto = UserDto.fromEntity(user)
        return await this.userRepo.save(user);
        //.then(e => UserDto.fromEntity(e));
    }

    public async assignCourse(userId: string, courseId: string) {
        const user = await this.userRepo.findOneOrFail(userId, { relations: ['courses']});
        const course = await this.courseRepo.findOneOrFail(courseId);
        user.courses.push(course);
        return await this.userRepo.save(user);
    }
}
