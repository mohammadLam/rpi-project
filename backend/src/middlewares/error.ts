import { ErrorRequestHandler } from 'express'
import mongoose from 'mongoose'
import { ZodError } from 'zod'

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof mongoose.Error) {
    return res.status(500).json({ message: err.message })
  } else if (err instanceof ZodError) {
    return res.status(403).json({
      message: err.message
    })
  } else {
    return res.status(500).json({
      message: err.message
    })
  }
}

export default errorHandler
