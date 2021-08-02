import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Course from "./Course";

@Entity("lecturers")
export default class Lecturer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  
  @OneToMany(() => Course, course => course.lecturer)
  courses: Course[];
}
