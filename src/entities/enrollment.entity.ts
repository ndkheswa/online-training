import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Course } from "./course.entity";
import { User } from "./user.entity";

@Entity()
export class Enrollment {

    @PrimaryColumn('uuid')
    id: string;
    
    @Column()
    status: string;

    @ManyToOne(() => User, user => user.enrollments)
    user: User;

    @ManyToOne(() => Course, course => course.enrollments)
    course: Course;
}