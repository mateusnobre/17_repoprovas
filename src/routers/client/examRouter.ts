import { Router } from 'express'

import ExamController from '../../controllers/examController'
import AuthMiddleware from '../../middlewares/authMiddleware'

const router = Router()

router.get('/get', ExamController.getExams)
router.post('/post', AuthMiddleware, ExamController.postExam)
router.get('/:examId', ExamController.getAExam)
router.delete('/:examId', AuthMiddleware, ExamController.deleteExam)
router.get('/:examId/comments', ExamController.getExamComments)
router.put('/:examId/like', AuthMiddleware, ExamController.likeExam)
router.get('/:examId/like', AuthMiddleware, ExamController.hasLikedExam)
router.delete('/:examId/like', AuthMiddleware, ExamController.unlikeExam)

export default router
