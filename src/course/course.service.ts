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

    public async findCourse(id: string): Promise<Course> {
        return await this.courseRepo.findOne({ where: {id: id}});
    }

    public async getUserCourses(userId: string): Promise<CourseDto[]> {

        const user =  await this.userRepo.findOne({ where: {id: userId}, relations: ['courses', 'courses.sections', 'courses.sections.chapters']});
        if (user === undefined) {
            throw new NotFoundException(`User with ID: ${userId} not found!`);
        }

        const dto = [];
        for (let i = 0; i < user.courses.length; i++) {
            dto.push(CourseDto.fromEntity(user.courses[i]));
        }
        return dto;
    }

    public async getCourseChapters(courseId: string) {
        const course = await this.courseRepo.findOne({ where: {id: courseId}, relations: ['sections']});

        if (course === undefined) {
            throw new NotFoundException(`Course with ID: ${courseId} not found!`);
        }

        return course;
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

    public async assignCourse(userId: string, courseId: string): Promise<User> {
        const user = await this.userRepo.findOneOrFail(userId, { relations: ['courses']});

        if (user === undefined) {
            throw new NotFoundException(`User with ID: ${userId} not found!`);
        }

        const course = await this.courseRepo.findOneOrFail(courseId);
        if (course === undefined) {
            throw new NotFoundException(`Course with ID: ${courseId} not found!`);
        }

        const assignedCourse = user.courses.find(found => found.id == course.id );

        if (assignedCourse !== undefined) {
            throw new BadRequestException(`You're already enrolled for this course: ${assignedCourse.name}`);
        } 

        user.courses.push(course);
        return await this.userRepo.save(user);
        
    }
}
