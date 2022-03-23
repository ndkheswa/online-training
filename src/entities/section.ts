import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Chapter } from "./chapter";

@Entity('section')
export class Section {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    title: string;

    @OneToMany(() => Chapter, chapter => chapter.section)
    chapters: Chapter[]
}