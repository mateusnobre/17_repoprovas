import { Entity, PrimaryGeneratedColumn, BaseEntity,Column, OneToMany } from "typeorm";
import Course from "./Course";

@Entity("lecturers")
export default class Lecturer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  
  @OneToMany(() => Course, course => course.lecturer)
  courses: Course[];
}
