import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PublicFile } from "./public-file.entity";
import { Section } from "./section.entity";

@Entity('chapter')
export class Chapter {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    duration: string;

    @JoinColumn()
    @OneToOne(() => PublicFile, { eager: true, nullable: true })
    public file?: PublicFile;

    @ManyToOne(() => Section, section => section.chapters)
    section: Section;
}