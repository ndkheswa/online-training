import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, Put, Req } from '@nestjs/common';
import { CourseDto } from 'src/Dtos/course-dto';
import { UserDto } from 'src/Dtos/user-dto';
import { Course } from 'src/entities/course.entity';
import { User } from 'src/entities/user.entity';
import { CourseService } from './course.service';
import { Request } from 'express';

@Controller('course')
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

    @Get('user/:id')
    public async geUserCourses(@Param('id') id: string) {
        return await this.courseService.getUserCourses(id);
    }

    @Get(':id')
    public async findCourse(@Param('id') id: string) {
        return await this.courseService.findCourse(id);
    }

    /**
     * 
     * @param dto @Post()
    public async create(@Body() user: UserDto): Promise<UserDto> {
        return await this.courseService.create(user);
    }
     * @returns 
     */

    @Post()
    public async createCourse(@Body() dto: CourseDto) {
        return await this.courseService.createCourse(dto);
    }

    @Patch('update/:id')
    public async updateCourse(@Param('id') id: string, @Body() course: Course) {
        return await this.courseService.updateCourse(id, course);
    }

    @Post('assign')
    public async assignCourse(@Req() req: Request) {
        return await this.courseService.assignCourse(req.body.userId, req.body.courseId);
    }

}
