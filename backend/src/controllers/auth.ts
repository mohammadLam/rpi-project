import { z } from 'zod'
import jwt from 'jsonwebtoken'

import catchAsync from '../utilites/catchAsync'

const authValidationSchema = z.object({
  phone: z.string(),
  password: z.string()
})

const controller = {
  login: catchAsync(async (req, res) => {
    const authObject = await authValidationSchema.parseAsync(req.body)
    if (authObject.phone === '' && authObject.password === '') {
      const accessToken = jwt.sign({ phone: authObject.phone }, process.env.JWT_SECRET || '', {
        expiresIn: '60d'
      })
      return res.cookie('accessToken', accessToken).json({
        message: 'Login sucessfull',
        data: {
          token: accessToken
        }
      })
    }
  })
}

export default controller
