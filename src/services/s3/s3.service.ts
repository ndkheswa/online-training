import { Injectable, Post, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as multer from 'multer';
import * as multerS3 from 'multer-s3';
import * as AWS from 'aws-sdk';
import { InjectRepository } from '@nestjs/typeorm';
import { Section } from 'src/entities/section.entity';
import { Repository } from 'typeorm';
import { Chapter } from 'src/entities/chapter.entity';
import { PublicFile } from 'src/entities/public-file.entity';

const s3 = new AWS.S3();

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

@Injectable()
export class S3Service {
    
    constructor(@InjectRepository(Section) private readonly sectionRepo: Repository<Section>,
                    @InjectRepository(Chapter) private readonly chapterRepo: Repository<Chapter>,
                    @InjectRepository(PublicFile) private readonly fileRepo: Repository<PublicFile>,
                    private configService: ConfigService) {}

    async fileUpload(buffer: Buffer, filename: string) {
        const uploadResult = await s3.upload({
            Bucket: 'artifacts-learncodingrsa',
            Body: buffer,
            Key: `${Date.now().toString()} - ${filename}`

        }).promise();

        const newFile = this.fileRepo.create({
            key: uploadResult.Key,
            url: uploadResult.Location
        });
        return await this.fileRepo.save(newFile);
    }
}



