import { Router } from 'express'
import controller from '../controllers/notice'

const router = Router()

router.route('/').post(controller.create).get(controller.getAll)
router.route('/:id').delete(controller.delete).put(controller.update)

export default router
