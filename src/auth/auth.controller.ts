import { BadRequestException, Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { LoginDto, UserDto } from 'src/Dtos/user-dto';
import { User } from 'src/entities/user.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('register')
    async register(@Body() userDto: UserDto) {
        try {
            return await this.authService.create(userDto);
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        try {
            return await this.authService.login(loginDto);
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }
    
    @Get('email/:email')
    public async findUserByEmail(@Param('email') email: string): Promise<User> {
        const user = await this.authService.findUserByEmail(email);
        if (user === undefined) {
            throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
        }
        return user;
    }

    @Get(':id')
    public async findUser(@Param('id')  id: string): Promise<User> {
        const user = await this.authService.findUser(id);

        if (user === undefined) {
            throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
        }
        return user
    }
}
