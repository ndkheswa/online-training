import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { S3Service } from './s3.service';
import { Request, Response } from 'express';

@Controller('s3')
export class S3Controller {
    constructor(private readonly s3Service: S3Service) {}

    @Post('upload')
    async create(@Req() req: Request, @Res() res: Response) {
        return this.s3Service.createSection(req, res);
    }
}
