import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Section } from './section.entity';
import { User } from './user.entity';

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

    @ManyToMany(() => User, user => user.courses, {cascade: ['insert', 'update']})
    users: User[];

    @OneToMany(() => Section, section => section.course)
    sections: Section[];
}