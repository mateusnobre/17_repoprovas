import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import Course from "./Course";
import Category from "./Category";

@Entity("exams")
export default class Exam {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  
  @Column()
  url: string;

  @ManyToOne(() => Course, course => course.exams)
  course: Course;
  
  @ManyToOne(() => Category, category => category.exams)
  category: Category;
}