import { Router } from 'express'

import CommentController from '../../controllers/commentController'
import AuthMiddleware from '../../middlewares/authMiddleware'

const router = Router()

router.post('/:postId', AuthMiddleware, CommentController.createComment)
router.get('/:commentId', CommentController.getAComment)
router.get('/:commentId/like', AuthMiddleware, CommentController.hasLikedComment)
router.put('/:commentId/like', AuthMiddleware, CommentController.likeComment)
router.delete('/:commentId/like', AuthMiddleware, CommentController.unlikeComment)

export default router
