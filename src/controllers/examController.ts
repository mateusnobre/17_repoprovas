import { Request, Response } from "express";

import * as examService from "../services/examService";
import Exam from '../entities/Exam'
import { getConnection } from 'typeorm'

class ExamController {
async  getExams (req: Request, res: Response) {
  try {
    const exams = await examService.getExams();
    res.status(200).send(exams);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

async postExam (req: Request, res: Response) {
  try {
    const exam = await examService.postExam(req.body.name, req.body.url, req.body.description,req.body.courseId, req.body.categoryId, req.body.userId);
    res.status(201).send(exam);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

async deleteExam(req: Request, res: Response) {
  const { examId } = req.params
  const userId = req.userId
  
  try {
    const exam = await Exam.findOne({ where: { id: examId }, loadRelationIds: true } )

    if (!exam) { return res.status(404).json('Exam not found') }

    const isUsersExam = String(exam.user) === userId

    if (!isUsersExam) { return res.status(403).json('Exam is not user\'s') }

    await Exam.deleteExam(examId)

    return res.status(200).json('Exam was deleted successfully')
  } catch (err) {
    if (err.code === '22P02') { return res.status(404).json('Invalid exam id') }
    console.error(err.message)
    return res.status(500).json('Server couldn\'t delete exam')
  }
}

async getAExam(req: Request, res: Response) {
  const { examId } = req.params

  try {
    const exam = await Exam.findOne({ where: { id: examId }, relations: ['comments'] })

    if (!exam) { return res.status(404).json('Exam not found') }

    return res.status(200).json(exam)
  } catch (err) {
    if (err.code === '22P02') { return res.status(404).json('Invalid exam id') }
    console.error(err.message)
    return res.status(500).json('Server couldn\'t get exam')
  }
}

async getExamComments(req: Request, res: Response) {
  const { examId } = req.params

  try {
    const exam = await Exam.findOne({ where: { id: examId }, relations: ['comments'] })

    if (!exam) { return res.status(404).json('Exam not found') }

    return res.status(200).json(exam.comments)
  } catch (err) {
    if (err.code === '22P02') { return res.status(404).json('Invalid exam id') }
    console.error(err.message)
    return res.status(500).json('Server couldn\'t get exam comments')
  }
}

async likeExam(req: Request, res: Response) {
  const { examId } = req.params
  const userId = req.userId

  try {
    const exam = await Exam.findOne({ where: { id: examId } })

    if (!exam) { return res.status(404).json('Exam not found') }
    
    const liked = await getConnection()
      .createQueryBuilder()
      .select()
      .from('exams_users_liked_users', 'exams_users_liked_users')
      .where({ examsId: examId, usersId: userId })
      .execute()

    if (liked.length !== 0) { return res.status(409).json('User already liked exam') }

    await getConnection()
      .createQueryBuilder()
      .insert()
      .into('exams_users_liked_users')
      .values([
        { examsId: examId, usersId: userId }
      ])
      .execute()

    await Exam.update({ id: examId }, { like_count: exam.like_count + 1 })

    return res.status(200).json('Exam was liked successfully')
  } catch (err) {
    if (err.code === '22P02') { return res.status(404).json('Invalid exam id') }
    console.error(err.message)
    return res.status(500).json('Server couldn\'t process like exam request')
  }
}

async hasLikedExam(req: Request, res: Response) {
  const { examId } = req.params
  const userId = req.userId

  try {
    const exam = await Exam.findOne({ where: { id: examId } })

    if (!exam) { return res.status(404).json('Exam not found') }
    
    const liked = await getConnection()
      .createQueryBuilder()
      .select()
      .from('exams_users_liked_users', 'exams_users_liked_users')
      .where({ examsId: examId, usersId: userId })
      .execute()

    if (liked.length === 0) { return res.status(200).json('false') }
    
    return res.status(200).json('true')
  } catch (err) {
    if (err.code === '22P02') { return res.status(404).json('Invalid exam id') }
    console.error(err.message)
    return res.status(500).json('Server couldn\'t process has liked exam request')
  }
}

async unlikeExam(req: Request, res: Response) {
  const { examId } = req.params
  const userId = req.userId

  try {
    const exam = await Exam.findOne({ where: { id: examId }, relations: ['usersLiked'] })

    if (!exam) { return res.status(404).json('Exam not found') }

    const liked = await getConnection()
      .createQueryBuilder()
      .select()
      .from('exams_users_liked_users', 'exams_users_liked_users')
      .where({ examsId: examId, usersId: userId })
      .execute()

    if (liked.length === 0) { return res.status(400).json('User has not liked exam') }

    await getConnection()
      .createQueryBuilder()
      .delete()
      .from('exams_users_liked_users')
      .where({ examsId: examId, usersId: userId })
      .execute()

    if (exam.like_count > 0) {
      await Exam.update({ id: examId }, { like_count: exam.like_count - 1 })
    }

    return res.status(200).json('Exam unliked successfully')
  } catch (err) {
    if (err.code === '22P02') { return res.status(404).json('Invalid exam id') }
    console.error(err.message)
    return res.status(500).json('Server couldn\'t process unlike exam request')
  }
}

async searchExams(req: Request, res: Response) {
  const { searchQuery } = req.body

  try {
    const matchedExams = await Exam
      .createQueryBuilder()
      .select()
      .where('title ILIKE :searchQuery', { searchQuery: `%${searchQuery}%` })
      .orWhere('description ILIKE :searchQuery', { searchQuery: `%${searchQuery}%` })
      .orWhere('subject ILIKE :searchQuery', { searchQuery: `%${searchQuery}%` })
      .orWhere('instructor ILIKE :searchQuery', { searchQuery: `%${searchQuery}%` })
      .getMany()

    if (matchedExams.length === 0) { return res.status(404).json('No exams matched query') }

    return res.status(200).json(matchedExams)
  } catch (err) {
    console.error(err.message)
    return res.status(500).json('Server couldn\'t process search exams request')
  }
}
}
export default new ExamController()