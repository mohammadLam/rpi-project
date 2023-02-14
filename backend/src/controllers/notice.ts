import NoticeModel, { noticeValidationSchema } from '../models/notice'
import catchAsync from '../utilites/catchAsync'

const controller = {
  create: catchAsync(async (req, res) => {
    const noticeObject = await noticeValidationSchema.parseAsync(req.body)
    const notice = await NoticeModel.create(noticeObject)
    return res.json({
      data: notice,
      message: 'নোটিশ তৈরী হয়েছে'
    })
  }),

  update: catchAsync(async (req, res) => {
    const noticeId = req.params.id
    const noticeObject = await noticeValidationSchema.parseAsync(req.body)

    const notice = await NoticeModel.updateOne(
      { _id: noticeId },
      {
        $set: { ...noticeObject }
      }
    )
    return res.json(notice)
  }),

  delete: catchAsync(async (req, res) => {
    const noticeId = req.params.id

    const deletedNotice = await NoticeModel.findByIdAndDelete(noticeId)
    return res.json({
      message: 'নোটিশ মুছে ফেলা হয়েছে'
    })
  }),

  getAll: catchAsync(async (req, res) => {
    const notices = await NoticeModel.find()
    return res.json({
      data: notices
    })
  })
}

export default controller
