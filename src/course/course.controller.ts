import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, Put } from '@nestjs/common';
import { CourseDto } from 'src/Dtos/course-dto';
import { UserDto } from 'src/Dtos/user-dto';
import { Course } from 'src/entities/course.entity';
import { User } from 'src/entities/user.entity';
import { CourseService } from './course.service';

@Controller('user')
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

    @Get('courses/:id')
    public async geUserCourses(@Param('id') id: string) {
        return await this.courseService.getUserCourses(id);
    }

    @Get(':id')
    public async findUser(@Param('id')  id: string): Promise<User> {
        const user = await this.courseService.findUser(id);

        if (user === undefined) {
            throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
        }
        return user
    }

    @Get('email/:email')
    public async findUserByEmail(@Param('email') email: string): Promise<User> {
        const user = await this.courseService.findUserByEmail(email);
        if (user === undefined) {
            throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
        }
        return user;
    }

    @Post()
    public async create(@Body() user: UserDto): Promise<UserDto> {
        return await this.courseService.create(user);
    }

    @Post('course')
    public async createCourse(@Body() dto: CourseDto) {
        return await this.courseService.createCourse(dto);
    }

    @Patch('update/:id')
    public async updateCourse(@Param('id') id: string, @Body() course: Course) {
        return await this.courseService.updateCourse(id, course);
    }

    @Patch('updateCourse')
    public async assignCourse(userId: string, courseId: string) {
        return await this.courseService.assignCourse(userId, courseId);
    }

}
