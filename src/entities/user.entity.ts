import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { Course } from "./course.entity";

@Entity('User')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    email: string;

    @Column()
    given_name: string;

    @Column()
    family_name: string;

    @ManyToMany(() => Course, course => course.users)
    @JoinTable()
    courses: Course[]
}