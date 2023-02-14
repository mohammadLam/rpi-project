import { Router } from 'express'
import controller from '../controllers/teacher'
import multer from 'multer'
import path from 'path'

const router = Router()

const diskStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.resolve('./public/upload/teachers'))
  },

  filename: (req, file, callback) => {
    const fileExtension = path.extname(file.originalname)
    const fileName: string = Date.now() + fileExtension
    callback(null, fileName)
  }
})

const upload = multer({
  storage: diskStorage,
  limits: {
    fileSize: 1000000 // 1MB
  },
  fileFilter: (req, file, callback) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      callback(null, true)
    } else {
      callback(Error('Only png, jpg, jpeg file is allowed'))
    }
  }
})

router.route('/').post(upload.single('picture'), controller.create).get(controller.getAll)
router.route('/:id').delete(controller.delete).put(controller.update)

export default router
