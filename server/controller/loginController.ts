import { Request, Response } from 'express';
import UserModel from '../model/UserModal';

export const loginController = async (request: Request, response: Response) => {
  
  try {
    const { username, password } = request.query;

    // Check if username and password are provided
    if (!username || !password) {
      return response.status(400).json({ message: 'Username and password are required' });
    }

    // Find user in the database based on provided credentials
    const user = await UserModel.findOne({ username, password });

    // Check if the user exists
    if (user) {
      // Successful login
      return response.status(200).json({ message: 'Login successful', user });
    } else {
      // Invalid credentials
      return response.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: 'Internal Server Error' });
  }

};