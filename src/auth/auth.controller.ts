import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { LoginDto, RegisterUserDto } from 'src/Dtos/auth-credentials';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('register')
    async register(@Body() registerDto: RegisterUserDto) {
        try {
            return await this.authService.register(registerDto);
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
}
