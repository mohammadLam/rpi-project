import mongoose from 'mongoose'
import { z } from 'zod'

export const noticeValidationSchema = z.object({
  title: z.string(),
  description: z.string()
})

type Notice = z.infer<typeof noticeValidationSchema>

const schema = new mongoose.Schema<Notice>(
  {
    title: {
      type: String,
      require: true
    },
    description: {
      type: String,
      require: true
    }
  },
  { timestamps: true }
)

export default mongoose.model('Notice', schema)
