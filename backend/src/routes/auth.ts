import { Router } from 'express'
import controller from '../controllers/auth'

const router = Router()

router.route('/').post(controller.login)

export default router
