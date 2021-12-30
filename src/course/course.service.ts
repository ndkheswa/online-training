import { Injectable } from '@nestjs/common';
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

    public async getUserCourses(id: string) {
        const user =  await this.userRepo.findOne({ where: {id: id }, relations: ['courses'] });
        return user.courses;
    }

    public async create(courses: Course[], dto: UserDto): Promise<UserDto> {
        const client = UserDto.from(dto);
        client.id = await this.authService.register(dto);
        return await this.userRepo.save(client.toEntity(courses))
        .then(e => UserDto.fromEntity(e));
        
    }
}
