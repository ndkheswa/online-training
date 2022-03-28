import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Chapter } from "./chapter.entity";

@Entity()
export class PublicFile {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public url: string;
    
    @Column()
    public key: string;
    
}