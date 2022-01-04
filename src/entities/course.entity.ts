import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
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
}