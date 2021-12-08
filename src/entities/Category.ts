import { basename } from "path/posix";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from "typeorm";
import Exam from "./Exam";

@Entity("categories")
export default class Category extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Exam, exam => exam.category)
  exams: Exam[];
}
