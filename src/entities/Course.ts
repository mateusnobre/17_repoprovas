import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import Exam from "./Exam";
import Lecturer from "./Lecturer";

@Entity("courses")
export default class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Exam, exam => exam.course)
  exams: Exam[];
  
  @ManyToOne(() => Lecturer, lecturer => lecturer.courses)
  lecturer: Lecturer;
}
