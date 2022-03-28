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
import { User } from './entities/user.entity';
import { S3Service } from './services/s3/s3.service';
import { S3Controller } from './services/s3/s3.controller';
import { Section } from './entities/section.entity';
import { Chapter } from './entities/chapter.entity';
import { PublicFile } from './entities/public-file.entity';
import { ChapterService } from './services/chapter/chapter.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forRoot(configService.getTypeOrmConfig()), TypeOrmModule.forFeature([Course, User, Section, Chapter, PublicFile])],
  controllers: [AppController, AuthController, CourseController, S3Controller],
  providers: [AppService, CourseService, S3Service, ChapterService],
})
export class AppModule {}
