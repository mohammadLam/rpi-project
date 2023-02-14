import mongoose from 'mongoose'

const connectdb = async () => {
  const uri = process.env.DB_URL
  if (!uri) throw Error('Database uri not found!')

  try {
    console.log('Connecting to database!')
    mongoose.set('strictQuery', false)
    await mongoose.connect(encodeURI(uri))
    console.log('Database connected...')
  } catch (error) {
    throw error
  }
}

export default connectdb
