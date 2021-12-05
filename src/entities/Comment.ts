import { BaseEntity, Column, DeepPartial, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import User from './User'
import Exam from './Exam'

@Entity('comments')
export default class Comment extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column()
    body!: string

    @Column({ default: 0 })
    like_count!: number

    @ManyToMany(() => User, { nullable: true })
    @JoinTable()
    usersLiked?: User[]

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    date!: Date

    @ManyToOne(() => Exam, exam => exam.comments, { onDelete: 'CASCADE' })
    exam!: Exam

    @ManyToOne(() => User, { eager: true })
    user!: User

    static async createNew({ body, exam, user }:
        {body: Comment['body'], exam: Comment['exam'], user: Comment['user']}) {
      const newComment = this.create({ body, exam, user })
    
      await this.save(newComment)
    
      return newComment
    }

    static async updateComment(id: Comment['id'], { body }:
        {body?: Comment['body']}) {
      const updatedProperties = this.filterNullProperties({ body })
      
      await this.update({ id }, updatedProperties)
    }
  
    static async deleteComment(commentId: Comment['id']) {
      await this.delete({ id: commentId })
    }

    static filterNullProperties(properties: DeepPartial<Comment>) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return Object.fromEntries(Object.entries(properties).filter(([_, v]) => v != null))
    }
}
