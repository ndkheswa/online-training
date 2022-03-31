import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chapter } from 'src/entities/chapter.entity';
import { Section } from 'src/entities/section.entity';
import { S3Service } from 'src/services/s3/s3.service';
import { Repository } from 'typeorm';

@Injectable()
export class ChapterService {

    constructor(@InjectRepository(Chapter) private chapterRepo: Repository<Chapter>,
                    @InjectRepository(Section) private sectionRepo: Repository<Section>,
                    private readonly fileService: S3Service) {}

    async addFile(chapterId: string, buffer: Buffer, filename: string) {
        const file = await this.fileService.fileUpload(buffer, filename);
        const chapter = await this.getById(chapterId);

        await this.chapterRepo.update(chapterId, {
            ...chapter,
            file
        });

        return file;
    }

    async getById(id: string) {
        const chapter = await this.chapterRepo.findOne({ id });
        if (chapter) {
            return chapter;
        }
        throw new HttpException(`Chapter with this id ${ id } does not exist`, HttpStatus.NOT_FOUND);
    }

    public async createChapter(sectionId: number, chapter: Chapter) {
        const section = await this.sectionRepo.findOneOrFail(sectionId, { relations: ['chapters']});

        if (section === undefined) {
            throw new NotFoundException(`Section with ID: ${sectionId} not found!`);
        }

        section.chapters.push(chapter);
        //const dto = CourseDto.fromEntity(course)
        return await this.sectionRepo.save(section);
        //.then(e => CourseDto.fromEntity(e));
    }
}
