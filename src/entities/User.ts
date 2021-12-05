import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate, OneToMany, BaseEntity, OneToOne, DeepPartial } from 'typeorm'
import bcrypt from 'bcrypt'
import Exam from './Exam'
import Session from './Session'
@Entity('users')
export default class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column({ unique: true })
    email!: string

    @Column()
    password!: string

    @Column()
    name!: string

    @Column()
    nationality!: string // Use somekind of Country

    @Column({ nullable: true })
    pictureURL?: string

    @Column({ nullable: true })
    bio?: string

    @OneToMany(() => Exam, exam => exam.user, { nullable: true, cascade: true })
    exams?: Exam[]

    @OneToOne(() => Session, session => session.user, { nullable: true })
    session?: Session

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
      this.password = bcrypt.hashSync(this.password, 12)
    }

    static async createNew({ email, password, name, nationality }:
        {email: User['email'], password: User['password'], name: User['name'], nationality: User['nationality']}) {
      const newUser = this.create({ email, password, name, nationality })

      await this.save(newUser)

      return newUser
    }

    static async deleteUser(id: User['id']) {
      await this.delete({ id })
    }

    static async findByEmail(email: User['email']) {
      const user = await this.findOne({ where: { email } })
      return user
    }
}
