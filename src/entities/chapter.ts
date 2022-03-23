import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Section } from "./section";

@Entity('chapter')
export class Chapter {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    title: string;

    @Column()
    duration: string;

    @ManyToOne(() => Section, section => section.chapters)
    section: Section;
}