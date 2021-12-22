import { IsUUID, IsString } from 'class-validator';
import { Course } from 'src/entities/course.entity';

export class CourseDto implements Readonly<CourseDto> {
    
    @IsUUID()
    id: string;

    @IsString()
    name: string;

    @IsString()
    description: string;

    public static from(dto: Partial<CourseDto>) {
        const it = new CourseDto();
        it.id = dto.id;
        it.name = dto.name;
        it.description = dto.description;
        return it;
    }

    public static fromEntity(entity: Course) {
        return this.from({
            id: entity.id,
            name: entity.name,
            description: entity.description
        })
    }
}