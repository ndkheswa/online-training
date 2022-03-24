import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Section } from "./section.entity";

@Entity('chapter')
export class Chapter {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    title: string;

    @Column()
    duration: string;

    @Column()
    url: string;

    @ManyToOne(() => Section, section => section.chapters)
    section: Section;
}