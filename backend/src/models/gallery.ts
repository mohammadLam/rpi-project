import mongoose from 'mongoose'
import { z } from 'zod'

export const galleryValidationSchema = z.object({
  caption: z.string(),
  image: z.string()
})

type Gallery = z.infer<typeof galleryValidationSchema>

const schema = new mongoose.Schema<Gallery>(
  {
    caption: {
      type: String,
      require: true
    },
    image: {
      type: String,
      require: true
    }
  },
  { timestamps: true }
)

export default mongoose.model('Gallery', schema)
