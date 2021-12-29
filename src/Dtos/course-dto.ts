import { IsUUID, IsString } from 'class-validator';
import { Course } from 'src/entities/course.entity';
import { User } from 'src/entities/user.entity';

export class CourseDto implements Readonly<CourseDto> {
    
    @IsUUID()
    id: string;

    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsString()
    status: string;

    public static from(dto: Partial<CourseDto>) {
        const it = new CourseDto();
        it.id = dto.id;
        it.name = dto.name;
        it.description = dto.description;
        it.status = dto.status;
        return it;
    }

    public static fromEntity(entity: Course) {
        return this.from({
            id: entity.id,
            name: entity.name,
            description: entity.description,
            status: entity.status
        })
    }

    public toEntity(user: User = null) {
        const it = new Course();
        it.id = this.id;
        it.name = this.name;
        it.description = this.description;
        it.status = this.status;
        return it;
    }

    
}