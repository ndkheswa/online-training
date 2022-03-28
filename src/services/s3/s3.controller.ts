import { Body, Controller, Post, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { S3Service } from './s3.service';
import { Request, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { ChapterService } from '../chapter/chapter.service';

@Controller('s3')
export class S3Controller {
    constructor(private readonly s3Service: S3Service,
                private readonly chaperService: ChapterService) {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async create(@Req() req: Request, @UploadedFile() file: Express.Multer.File) {
        return this.chaperService.addFile(req.body.chapterId, file.buffer, file.originalname);
    }
}
