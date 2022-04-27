import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/entities/course.entity';
import { User } from 'src/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { AuthConfig } from './auth.config';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }),  ConfigModule.forRoot({
    isGlobal: true
  }), TypeOrmModule.forFeature([Course, User]) 
  ],
  exports: [AuthService],
  providers: [AuthService, JwtStrategy, AuthConfig]
})
export class AuthModule {
  
}
