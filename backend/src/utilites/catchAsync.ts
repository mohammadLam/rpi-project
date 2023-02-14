import { Request, Response, NextFunction } from 'express'

type fn = (req: Request, res: Response, next: NextFunction) => Promise<any>

const catchAsync = (fn: fn) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next)
  }
}

export default catchAsync
