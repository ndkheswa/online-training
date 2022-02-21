import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Enrollment } from './enrollment.entity';
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

    @OneToMany(() => Enrollment, enrollment => enrollment.course)
    enrollments: Enrollment[]
}