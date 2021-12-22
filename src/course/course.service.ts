import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from 'src/entities/course.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CourseService {
    
    constructor(@InjectRepository(Course) private readonly repo: Repository<Course>) {}

    public async getAll() {
        return await this.repo.find();
    }
}
