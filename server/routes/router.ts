import { loginController } from "../controller/loginController";

const express = require('express');
const route = express.Router()
const bookingController = require('../controller/bookingController')
const roomsController = require('../controller/roomsController')

route.get('/login', loginController);

route.get('/rooms', roomsController.find)

route.post('/rooms', roomsController.create)

route.delete('/rooms', roomsController.delete)

route.get('/user', bookingController.getUserDetails)

route.get('/add-user', bookingController.addUser);

route.post('/meetings', bookingController.AddBooking);

route.put('/meetings',bookingController.UpdateBooking);

route.delete('/meetings',bookingController.DeleteBooking);

route.get('/allBookings', bookingController.getAllBookings)

export default route;