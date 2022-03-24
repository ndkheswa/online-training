import { Injectable, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as multer from 'multer';
import * as multerS3 from 'multer-s3';
import * as AWS from 'aws-sdk';

const s3 = new AWS.S3();

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

@Injectable()
export class S3Service {
    
    constructor(private configService: ConfigService) {}

    async fileUpload(@Req() req, @Res() res) {
        try {
            this.upload(req, res, function(error) {
                if (error) {
                    return res.status(400).json(`Failed to upload image file: ${error}`);
                }
                return res.status(201).json(req.files[0].location);
            });
        } catch (error) {
            return res.status()
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
}
