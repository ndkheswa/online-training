import { Controller, Post, Req, Res } from '@nestjs/common';
import { S3Service } from './s3.service';

@Controller('fileupload')
export class S3Controller {
    constructor(private readonly s3Service: S3Service) {}

    @Post()
    async create(@Req() req, @Res() res) {
        try {
            return await this.s3Service.fileUpload(req, res);
        } catch (error) {
            return res
            .status(500)
            .json(`Failed to upload image file: ${error.message}`);
        }
    }
}
