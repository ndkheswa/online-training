import { Controller, Get } from '@nestjs/common';
import { CourseDto } from 'src/Dtos/course-dto';
import { CourseService } from './course.service';

@Controller('courses')
export class CourseController {

    constructor(private courseService: CourseService) {}
    
    @Get()
    public async getAll() {
        return await this.courseService.getAll();
    }

}
