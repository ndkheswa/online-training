import { BadRequestException, Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, Put, Req, UseGuards } from '@nestjs/common';
import { CourseDto } from 'src/Dtos/course-dto';
import { UserDto } from 'src/Dtos/user-dto';
import { Course } from 'src/entities/course.entity';
import { User } from 'src/entities/user.entity';
import { CourseService } from './course.service';
import { Request } from 'express';
import { Section } from 'src/entities/section.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('course')
export class CourseController {

    constructor(private courseService: CourseService) {}
    
    @Get()
    @UseGuards(AuthGuard('jwt'))
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
    // @UseGuards(AuthGuard('jwt'))
    public async geUserCourses(@Param('id') id: string) {
        return await this.courseService.getUserCourses(id);
    }

    @Get(':id')
    // @UseGuards(AuthGuard('jwt'))
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
    @UseGuards(AuthGuard('jwt'))
    public async createCourse(@Body() dto: CourseDto) {
        return await this.courseService.createCourse(dto);
    }

    @Patch('update/:id')
    @UseGuards(AuthGuard('jwt'))
    public async updateCourse(@Param('id') id: string, @Body() course: Course) {
        return await this.courseService.updateCourse(id, course);
    }

    @Post('create/section/:id')
    @UseGuards(AuthGuard('jwt'))
    public async createSection(@Param('id') courseId: string, @Body() section: Section) {
        return await this.courseService.createSection(courseId, section);
    }

    @Post('assign/user')
    @UseGuards(AuthGuard('jwt'))
    public async assignCourse(@Req() req: Request) {
        try {
            return await this.courseService.assignCourse(req.body.userId, req.body.courseId);
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    @Get('chapter/:id')
    @UseGuards(AuthGuard('jwt'))
    public async findChapter(@Param('id') id: string) {
        return await this.courseService.getCourseSections(id);
    }
}
