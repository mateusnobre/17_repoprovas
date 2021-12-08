import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, BaseEntity } from "typeorm";
import Exam from "./Exam";
import Lecturer from "./Lecturer";

@Entity("courses")
export default class Course extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Exam, exam => exam.course)
  exams: Exam[];
  
  @ManyToOne(() => Lecturer, lecturer => lecturer.courses)
  lecturer: Lecturer;
}
