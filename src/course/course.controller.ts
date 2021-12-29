import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CourseDto } from 'src/Dtos/course-dto';
import { Course } from 'src/entities/course.entity';
import { User } from 'src/entities/user.entity';
import { CourseService } from './course.service';

@Controller('courses')
export class CourseController {

    constructor(private courseService: CourseService) {}
    
    @Get()
    public async getAll(): Promise<CourseDto[]> {
        return await this.courseService.getAll();
    }

    /**
     * 
     * @param user @Get(":id")
    public async getMyCourses(@Param('id') id: string): Promise<CourseDto[]> {
        return await this.courseService.getUserCourses(id);
    }
     * @param course 
     * @returns 
     */

    @Post()
    public async create(@Body() user: User, @Body() course: Course): Promise<CourseDto> {
        return await this.courseService.create(course, user);
    }

}
