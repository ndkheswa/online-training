import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './services/config/config.service';
import { CourseController } from './course/course.controller';
import { CourseService } from './course/course.service';
import { Course } from './entities/course.entity';

@Module({
  imports: [AuthModule, TypeOrmModule.forRoot(configService.getTypeOrmConfig()), TypeOrmModule.forFeature([Course])],
  controllers: [AppController, AuthController, CourseController],
  providers: [AppService, CourseService],
})
export class AppModule {}
