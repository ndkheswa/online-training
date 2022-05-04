import { Body, Controller, Param, Post, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Request, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from 'src/services/s3/s3.service';
import { ChapterService } from './chapter.service';
import { Chapter } from 'src/entities/chapter.entity';

@Controller('chapter')
export class ChapterController {
    constructor(private readonly s3Service: S3Service,
                private readonly chapterService: ChapterService) {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async create(@Req() req: Request, @UploadedFile() file: Express.Multer.File) {
        return this.chapterService.addFile(req.body.chapterId, file.buffer, file.originalname);
    }

    @Post('create/:id')
    @UseInterceptors(FileInterceptor('file'))
    async createChapter(@Param('id') sectionId: number, @Body() chapter: Chapter) {
        return this.chapterService.createChapter(sectionId, chapter);
    }
}

