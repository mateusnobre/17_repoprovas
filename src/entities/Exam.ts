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
  static create: any;
  static save: any;
  static update: any;
  static delete: any;

  static async createNew({ url, name, description, user, courseId, categoryId }:
    { url: Exam['url'], name: Exam['name'], description: Exam['description'], user: Exam['user'], courseId?: Exam['courseId'], categoryId?: Exam['categoryId'] }) {
  const examInfo = this.filterNullProperties({ url, description, name, user, courseId, categoryId })
  
  const newExam = this.create(examInfo)

  await this.save(newExam)

  return newExam
}

static async updateExam(id: Exam['id'], { url, name, description, courseId, categoryId }:
    { url?: Exam['url'], name?: Exam['name'], description?: Exam['description'], courseId?: Exam['courseId'], categoryId?: Exam['categoryId'] }) {
  const updatedProperties = this.filterNullProperties({ url, name, description, courseId, categoryId })

  await this.update({ id }, updatedProperties)
}

static async deleteExam(id: Exam['id']) {
  await this.delete({ id })
}

static filterNullProperties(properties: DeepPartial<Exam>) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return Object.fromEntries(Object.entries(properties).filter(([_, v]) => v != null))
}
}