import { Entity, PrimaryGeneratedColumn, Column, OneToMany,ManyToOne, ManyToMany, JoinTable, DeepPartial } from "typeorm";
import Course from "./Course";
import Category from "./Category";
import User from './User';
import Comment from './Comment'

@Entity("exams")
export default class Exam {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  
  @Column()
  url: string;

  @Column()
  description!: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date!: Date
  
  @Column({ default: 0 })
  like_count!: number
  
  @ManyToMany(() => User, { nullable: true })
  @JoinTable()
  usersLiked?: User[]
  
  @Column()
  courseId: string;

  @Column()
  categoryId!: string

  @OneToMany(() => Comment, comment => comment.exam, { nullable: true, cascade: true })
  comments?: Comment[]

  @ManyToOne(() => User, user => user.exams, { eager: true })
    user!: User

  @ManyToOne(() => Course, course => course.exams)
  course: Course;
  
  @ManyToOne(() => Category, category => category.exams)
  category: Category;
}