import { Request, Response } from 'express'
import { getConnection } from 'typeorm'

import Comment from '../entities/Comment'
import User from '../entities/User'
import Exam from '../entities/Exam'

class CommentController {
  async createComment(req: Request, res: Response) {
    const userId = req.userId
    const { examId } = req.params
    const { body } = req.body
    
    try {
      const user = await User.findOne({ where: { id: userId } })
  
      if (!user) { return res.status(401).json('User is not registered') }
  
      const exam = await Exam.findOne({ where: { id: examId } })
  
      if (!exam) { return res.status(404).json('Exam not found') }
  
      const newComment = await Comment.createNew({ body, exam, user })
  
      return res.status(200).json(newComment)
    } catch (err) {
      if (err.code === '22P02') { return res.status(404).json('Invalid exam id') }
      console.error(err.message)
      return res.status(500).json('Server couldn\'t create comment')
    }
  }

  async getAComment(req: Request, res: Response) {
    const { commentId } = req.params

    try {
      const comment = await Comment.findOne({ where: { id: commentId } })
  
      if (!comment) { return res.status(404).json('Comment not found') }
  
      return res.json(comment)
    } catch (err) {
      if (err.code === '22P02') { return res.status(404).json('Invalid comment id') }
      console.error(err.message)
      return res.status(500).json('Server couldn\'t get comment')
    }
  }

  async likeComment(req: Request, res: Response) {
    const { commentId } = req.params
    const userId = req.userId

    try {
      const comment = await Comment.findOne({ where: { id: commentId } })
  
      if (!comment) { return res.status(404).json('Comment not found')  }
      
      const liked = await getConnection()
        .createQueryBuilder()
        .select()
        .from('comments_users_liked_users', 'comments_users_liked_users')
        .where({ commentsId: commentId, usersId: userId })
        .execute()

      if (liked.length !== 0) { return res.status(409).json('User already liked comment') }

      await getConnection()
        .createQueryBuilder()
        .insert()
        .into('comments_users_liked_users')
        .values([
          { commentsId: commentId, usersId: userId }
        ])
        .execute()

      await Comment.update({ id: commentId }, { like_count: comment.like_count + 1 })

      return res.status(200).json('Comment was liked successfully')
    } catch (err) {
      if (err.code === '22P02') { return res.status(404).json('Invalid comment id') }
      console.error(err.message)
      return res.status(500).json('Server couldn\'t process like comment request')
    }
  }

  async hasLikedComment(req: Request, res: Response) {
    const { commentId } = req.params
    const userId = req.userId

    try {
      const comment = await Comment.findOne({ where: { id: commentId } })
  
      if (!comment) { return res.status(404).json('Comment not found') }
      
      const liked = await getConnection()
        .createQueryBuilder()
        .select()
        .from('comments_users_liked_users', 'comments_users_liked_users')
        .where({ commentsId: commentId, usersId: userId })
        .execute()

      if (liked.length === 0) { return res.status(200).json('false') }

      return res.status(200).json('true')
    } catch (err) {
      if (err.code === '22P02') { return res.status(404).json('Invalid comment id') }
      console.error(err.message)
      return res.status(500).json('Server couldn\'t process has liked comment request')
    }
  }

  async unlikeComment(req: Request, res: Response) {
    const { commentId } = req.params
    const userId = req.userId

    try {
      const comment = await Comment.findOne({ where: { id: commentId } })
  
      if (!comment) { return res.status(404).json('Comment not found') }

      const liked = await getConnection()
        .createQueryBuilder()
        .select()
        .from('comments_users_liked_users', 'comments_users_liked_users')
        .where({ commentsId: commentId, usersId: userId })
        .execute()

      if (liked.length === 0) { return res.status(400).json('User has not liked comment') }

      await getConnection()
        .createQueryBuilder()
        .delete()
        .from('comments_users_liked_users')
        .where({ commentsId: commentId, usersId: userId })
        .execute()

      if (comment.like_count > 0) {
        await Comment.update({ id: commentId }, { like_count: comment.like_count - 1 })
      }

      return res.sendStatus(200)
    } catch (err) {
      if (err.code === '22P02') { return res.status(404).json('Invalid comment id') }
      console.error(err.message)
      return res.status(500).json('Server couldn\'t process unlike comment request')
    }
  }
}

export default new CommentController()
