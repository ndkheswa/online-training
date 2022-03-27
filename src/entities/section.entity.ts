import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Chapter } from "./chapter.entity";
import { Course } from "./course.entity";

@Entity('section')
export class Section {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    title: string;

    @OneToMany(() => Chapter, chapter => chapter.section, {cascade: ['insert', 'update']})
    chapters: Chapter[];

    @ManyToOne(() => Course, course => course.sections)
    course: Course;
}