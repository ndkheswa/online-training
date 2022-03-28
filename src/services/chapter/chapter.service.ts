import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chapter } from 'src/entities/chapter.entity';
import { Repository } from 'typeorm';
import { S3Service } from '../s3/s3.service';

@Injectable()
export class ChapterService {

    constructor(@InjectRepository(Chapter) private chapterRepo: Repository<Chapter>,
                    private readonly fileService: S3Service) {}

    async getById(id: string) {
        const chapter = await this.chapterRepo.findOne({ id });
        if (chapter) {
            return chapter;
        }
        throw new HttpException(`Chapter with this id ${ id } does not exist`, HttpStatus.NOT_FOUND);
    }

    async addFile(chapterId: string, buffer: Buffer, filename: string) {
        const file = await this.fileService.fileUpload(buffer, filename);
        const chapter = await this.getById(chapterId);

        await this.chapterRepo.update(chapterId, {
            ...chapter,
            file
        });

        return file;
    }
}
