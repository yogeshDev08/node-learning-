import mongoose, { Document, Schema } from 'mongoose'

interface Rooms extends Document {
  roomName: string
  roomId: string
  status: boolean
}

const RoomsSchema = new Schema<Rooms>({
  roomName: { type: String, required: true },
  roomId: { type: String, required: true, unique: true },
  status: { type: Boolean, required: true }
})

const RoomsModel = mongoose.model<Rooms>('Rooms', RoomsSchema)

export default RoomsModel
