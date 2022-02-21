import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, PrimaryColumn, OneToMany } from "typeorm";
import { Course } from "./course.entity";
import { Enrollment } from "./enrollment.entity";

@Entity('User')
export class User {

    @PrimaryColumn('uuid')
    id: string;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    given_name: string;

    @Column()
    family_name: string;

    @JoinTable()
    @ManyToMany(() => Course, course => course.users, {cascade: ['insert', 'update']})
    courses: Course[];

    @OneToMany(() => Enrollment, enrollment => enrollment.user)
    enrollments: Enrollment[]
}