import mongoose, { Document, Schema } from 'mongoose'

interface Booking extends Document {
  roomId: number
  date: string
  startTime: string
  endTime: string
  event: string
}

interface User extends Document {
  username: string
  password: string
  isAdmin: boolean
  booking: Booking[]
}

const userSchema = new Schema<User>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: false },
  booking: [
    {
      roomId: { type: Number, required: true },
      date: { type: String, required: true },
      startTime: { type: String, required: true },
      endTime: { type: String, required: true },
      event: { type: String, required: true }
    }
  ]
})

const UserModel = mongoose.model<User>('User', userSchema)

export default UserModel
