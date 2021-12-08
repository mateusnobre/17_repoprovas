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
  
    static async deleteComment(commentId: Comment['id']) {
      await this.delete({ id: commentId })
    }

}
