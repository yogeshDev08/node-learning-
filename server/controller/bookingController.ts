import { Request, Response } from 'express'
import UserModel from '../model/UserModal'

exports.addUser = async (request: Request, response: Response) => {
  const { username, password, isAdmin } = request.body

  try {
    const newUser = new UserModel({ username, password, isAdmin, booking: [] })
    await newUser.save()

    response.status(201).json(newUser)
  } catch (error) {
    response.status(500).json({ error: 'Internal Server Error' })
  }
}

exports.getUserDetails = async (request: Request, response: Response) => {

  const userId = request.query.userId;

  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return response.status(404).json({ error: 'User not found' });
    }

    response.status(200).json({
      message: 'User details retrieved successfully',
      data: user,
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllBookings = async (request:Request, response: Response) => {
  
  const userId = request.query.userId;

  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return response.status(404).json({ error: 'User not found' });
    }

    if (!user.isAdmin) {
      return response.status(403).json({ error: 'Permission denied' });
    }

    const allBookings = await UserModel.find({}, 'booking'); // Retrieve all bookings

    response.status(200).json({
      message: 'All bookings retrieved successfully',
      data: allBookings,
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.AddBooking = async (request: Request, response: Response) => {
  
  const userId = request.query.userId;
  const { roomId, date, startTime, endTime, event } = request.body;

  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return response.status(404).json({ error: 'User not found' });
    }

    // Check if a booking already exists for the same date, time, and meeting room ID
    const existingBooking = user.booking.find(
      (booking) =>
        booking.date === date &&
        booking.roomId === roomId &&
        ((booking.startTime <= startTime && booking.endTime >= startTime) ||
          (booking.startTime <= endTime && booking.endTime >= endTime) ||
          (booking.startTime >= startTime && booking.endTime <= endTime))
    );

    if (existingBooking) {
      return response.status(400).json({
        message: 'Meeting room not available for this moment. Please select another date or time.',
        data: existingBooking,
      });
    }

    const newBooking: any = { roomId, date, startTime, endTime, event };
    user.booking.push(newBooking);
    await user.save();

    response.status(201).json({
      message: 'Meeting added successfully',
      data: newBooking,
    });
  } catch (error) {
    response.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.UpdateBooking = async (request: Request, response: Response) => {

  const userId = request.query.userId;
  const { roomId, date, startTime, endTime, event, bookingId } = request.body

  try {
    const user = await UserModel.findById(userId)

    if (!user) {
      return response.status(404).json({ error: 'User not found' })
    }

    const bookingIndex = user.booking.findIndex(
      booking => booking._id == bookingId
    )

    if (bookingIndex === -1) {
      return response.status(404).json({ error: 'Booking not found' })
    }

    user.booking[bookingIndex] = {
      roomId,
      date,
      startTime,
      endTime,
      event
    } as any
    await user.save()

    response.json({
      data: user.booking[bookingIndex],
      message: 'Meeting updated successfully'
    })
  } catch (error) {
    response.status(500).json({ error: 'Internal Server Error' })
  }
}

exports.DeleteBooking = async (request: Request, response: Response) => {
  const {userId, bookingId} = request.query
  try {
    const user = await UserModel.findById(userId)

    if (!user) {
      return response.status(404).json({ error: 'User not found' })
    }

    const bookingIndex = user.booking.findIndex(
      booking => booking._id == bookingId
    )

    if (bookingIndex === -1) {
      return response.status(404).json({ error: 'Booking not found' })
    }

    const deletedBooking = user.booking.splice(bookingIndex, 1)
    await user.save()

    response.json(deletedBooking[0])
  } catch (error) {
    response.status(500).json({ error: 'Internal Server Error' })
  }
}
