import TeacherModel, { teacherValidationSchema } from '../models/teacher'
import catchAsync from '../utilites/catchAsync'

const controller = {
  create: catchAsync(async (req, res) => {
    const file = req.file

    const teacherObject = await teacherValidationSchema.parseAsync({
      ...req.body,
      picture: file && `upload/teachers/${file.filename}`
    })
    const teacher = await TeacherModel.create(teacherObject)
    return res.json(teacher)
  }),

  update: catchAsync(async (req, res) => {
    const teacherId = req.params.id
    const teacherObject = await teacherValidationSchema.parseAsync(req.body)

    const teacher = await TeacherModel.updateOne(
      { _id: teacherId },
      {
        $set: { ...teacherObject }
      }
    )
    return res.json(teacher)
  }),

  delete: catchAsync(async (req, res) => {
    const teacherId = req.params.id

    const deletedTeacher = await TeacherModel.findByIdAndDelete(teacherId, { new: true })
    return res.json({
      message: `${deletedTeacher ? deletedTeacher.name : 'Teacher'} is deleted`
    })
  }),

  getAll: catchAsync(async (req, res) => {
    const teachers = await TeacherModel.find()
    return res.json({
      data: teachers
    })
  })
}

export default controller
