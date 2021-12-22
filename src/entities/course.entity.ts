import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('course')
export class Course {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    status: string;
}