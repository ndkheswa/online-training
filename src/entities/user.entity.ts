import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, PrimaryColumn } from "typeorm";
import { Course } from "./course.entity";

@Entity('User')
export class User {

    @PrimaryColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    given_name: string;

    @Column()
    family_name: string;

    @ManyToMany(() => Course, {cascade: ['insert', 'update']})
    @JoinTable()
    courses: Course[]
}