import mongoose from 'mongoose'
import { z } from 'zod'

export const teacherValidationSchema = z.object({
  name: z.string(),
  phone: z.string(),
  designation: z.string(),
  picture: z.string().nullish()
})

type Teacher = z.infer<typeof teacherValidationSchema>

const schema = new mongoose.Schema<Teacher>(
  {
    name: {
      type: String,
      require: true
    },
    phone: {
      type: String,
      require: true,
      unique: true
    },
    designation: {
      type: String,
      require: true
    },
    picture: String
  },
  { timestamps: true }
)

export default mongoose.model('Teacher', schema)
