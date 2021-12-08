import { Router } from 'express'

import UserController from '../../controllers/userController'
import AuthMiddleware from '../../middlewares/authMiddleware'

const router = Router()

router.post('/search', UserController.searchUsers)
router.post('/sign-up', UserController.signUp)
router.post('/sign-in', UserController.signIn)
router.post('/sign-out', AuthMiddleware, UserController.signOut)
router.delete('/delete', AuthMiddleware, UserController.deleteUser)
router.get('/session', AuthMiddleware, UserController.getCurrentUser)
router.get('/:userId', UserController.getAUser)
router.get('/:userId/exams', UserController.getUserExams)

export default router
