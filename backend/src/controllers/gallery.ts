import GalleryModel, { galleryValidationSchema } from '../models/gallery'
import catchAsync from '../utilites/catchAsync'

const controller = {
  create: catchAsync(async (req, res, next) => {
    if (!req.file) return next(Error('Please upload an image'))

    const galleryObject = await galleryValidationSchema.parseAsync({
      ...req.body,
      image: `upload/gallery/${req.file.filename}`
    })
    const gallery = await GalleryModel.create(galleryObject)
    return res.json({
      data: gallery,
      message: 'গ্যালারিতে ছবি যুক্ত হয়েছে'
    })
  }),

  delete: catchAsync(async (req, res) => {
    const galleryId = req.params.id

    const deletedGallery = await GalleryModel.findByIdAndDelete(galleryId)
    return res.json({
      message: 'গ্যালারি থেকে ছবি মুছে ফেলা হয়েছে'
    })
  }),

  getAll: catchAsync(async (req, res) => {
    const galleries = await GalleryModel.find()
    return res.json({
      data: galleries
    })
  })
}

export default controller
