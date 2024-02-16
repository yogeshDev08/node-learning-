import { Request, Response } from 'express'
import RoomsModel from '../model/RoomsDatabase'

exports.find = async (request: Request, response: Response) => {
  try {
    const rooms = await RoomsModel.find()
    response.json({
      message: 'Meeting rooms list retrieved successfully',
      data: rooms
    })
  } catch (error) {
    response.status(500).json({
      message: 'Internal Server Error',
      data: {}
    })
  }
}

exports.create = async (request: Request, response: Response) => {
  const { roomName, roomId, status } = request.body

  try {
    const newRoom = new RoomsModel({ roomName, roomId, status })
    await newRoom.save()
    response.status(201).json({
      message: 'Meeting room create successfully',
      data: newRoom
    })
  } catch (error) {
    response.status(500).json({
      message: 'Internal Server Error',
      data: {}
    })
  }
}

exports.delete = async (request: Request, response: Response) => {

  const roomId = request.query.id

  try {
    const deletedRoom = await RoomsModel.findOneAndDelete({ roomId })
    if (deletedRoom) {
      response.json({
        message: 'Meeting room delete successfully',
        data: deletedRoom
      })
    } else {
      response.status(404).json({
        message: 'Room not found',
        data: {}
      })
    }
  } catch (error) {
    response.status(500).json({
      message: 'Internal Server Error',
      data: {}
    })
  }
}
