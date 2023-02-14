import { Router } from 'express'
import teacherRouter from './teacher'
import noticeRouter from './notice'
import galleryRouter from './gallery'
import authRouter from './auth'

const router = Router()

router.use('/api/v1/teacher', teacherRouter)
router.use('/api/v1/notice', noticeRouter)
router.use('/api/v1/gallery', galleryRouter)
router.use('/api/v1/auth', authRouter)

export default router
