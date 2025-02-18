import express, { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_TOKEN_SECRET;

import { User } from '../models/User.js';

const router: Router = express.Router();

router.post('/login', async(req: Request, res: Response) => {

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ username: email });

    if (!user) {
      res.status(400).json({ status: 'error', message: 'User not found' });
      return;
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(400).json({ status: 'error', message: 'Invalid credentials' });
      return;
    }

    let token = jwt.sign({ email: user.username, role: user.role }, secret );
    res.cookie("uid", token);

    res.status(200).json({ message:'Logged In', cookie: token});
    
  } catch (error) {
    console.log('Error logging user', error.message)
    res.status(500).json({ status: 'error', message:"Internal Server Error"});
  }

});

router.post('/register', async (req: Request, res: Response) => {
  
  try {
    let { email, password } = req.body;
    await User.create({ username: email, password });

    res.status(200).json({status:"success"});
    
  } catch (error) {
    console.log('Error registering user',error.message);
    res.status(500).json({status:"error", message:"Internal Server Error"});
  }
    
});

export default router;