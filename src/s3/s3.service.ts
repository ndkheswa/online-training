import { Injectable, Post, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as multer from 'multer';
import * as multerS3 from 'multer-s3';
import * as AWS from 'aws-sdk';
import { InjectRepository } from '@nestjs/typeorm';
import { Section } from 'src/entities/section.entity';
import { Repository } from 'typeorm';
import { Chapter } from 'src/entities/chapter.entity';

const s3 = new AWS.S3();

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

@Injectable()
export class S3Service {
    
    constructor(@InjectRepository(Section) private readonly sectionRepo: Repository<Section>,
                    @InjectRepository(Chapter) private readonly chapterRepo: Repository<Chapter>,
                    private configService: ConfigService) {}

    async fileUpload(@Req() req, @Res() res) {
        try {
            this.upload(req, res, function(error) {
                if (error) {
                    return res.status(400).json(`Failed to upload image file: ${error}`);
                }
                return res.status(201).json(req.files[0].location);
            });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    upload = multer({
        storage: multerS3({
            s3: s3,
            bucket: 'artifacts-learncodingrsa',
            acl: 'public-read',
            key: function(request, file, cb) {
                cb(null, `${Date.now().toString()} - ${file.originalname}`);
            },
        })
    }).array('upload', 1);

    async createSection(@Req() req, @Res() res) {
    
        //return url;
        try {
            //const url = this.fileUpload(req, res);
            const section = await this.sectionRepo.findOneOrFail(req.body.sectionId, {relations: ['chapters']}); 

            const chapter = new Chapter();

            chapter.duration = "2.00";
            chapter.url = "some_url";
            chapter.title = req.body.title;
            section.chapters.push(chapter);

            const result = await this.sectionRepo.save(section);

            return res.status(201).json(result);

        } catch (e) {
            return e.message;
        }
    }
}



