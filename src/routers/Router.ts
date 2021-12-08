import { Router } from 'express'

import UserRouter from './client/userRouter'
import ExamRouter from './client/examRouter'
import CommentRouter from './client/commentRouter'

const router = Router()

router.use('/user', UserRouter)
router.use('/exam', ExamRouter)
router.use('/comment', CommentRouter)

router.get('/', (req, res) => res.json('Api online.'))


export default router
