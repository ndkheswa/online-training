import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseDto } from 'src/Dtos/course-dto';
import { Course } from 'src/entities/course.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CourseService {
    
    constructor(@InjectRepository(Course) private readonly courseRepo: Repository<Course>, 
        @InjectRepository(User) private readonly userRepo: Repository<User>) {}

    public async getAll(): Promise<CourseDto[]> {
        return await this.courseRepo.find()
        .then(items => items.map(e => CourseDto.fromEntity(e)));
    }

    public async getUserCourses(id: string) {
        const user =  await this.userRepo.findOne({ where: {id: id }, relations: ['courses'] });
        return user.courses;
    }

    public async create(course: Course, user: User): Promise<CourseDto> {
        const courseDto = CourseDto.fromEntity(course);
        return await this.courseRepo.save(courseDto.toEntity(user))
            .then(e => CourseDto.fromEntity(e));
    }
}
