import { Request, Response } from 'express';
import db from '../database/connection';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export default class AuthController {
  async register(request: Request, response: Response) {
    const {
      name,
      avatar,
      whatsapp,
      bio,
      email,
      password
    } = request.body;

    if (!name || !avatar || !whatsapp || !bio || !email || !password) return response.status(400).json({ success: false, error: 'Please provide an name, avatar, whatsapp, bio, email and password' });

    const [emailExists] = await db('users').where('email', '=', email);

    if (emailExists) return response.status(400).json({ success: false, error: 'Email already exists' });

    const salt =  await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const insertedUsersIds = await db('users').insert({
      name,
      avatar,
      whatsapp,
      bio,
      email,
      password: hashedPassword
    });
  
    const user_id = insertedUsersIds[0];

    const token = jwt.sign({ user_id }, process.env.JWT_SECRET || '');

    return response.header('auth-token', token).json({ success: true, user_id, access_token: token });
  }

  async login(request: Request, response: Response) {
    const { email, password } = request.body;

    if (!email || !password) return response.status(400).json({ success: false, error: 'Please provide an email and password' });

    const [user] = await db('users').where('email', '=', email);

    if (!user) return response.status(400).json({ success: false, error: 'User doesn\'t exists' });

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) return response.status(400).json({ success: false, error: 'Password doesn\'t match' });

    const token = jwt.sign({ user_id: user.id }, process.env.JWT_SECRET || '');

    return response.header('auth-token', token).json({ success: true, access_token: token });
  }
}