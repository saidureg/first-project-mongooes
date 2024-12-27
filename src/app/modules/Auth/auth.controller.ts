import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { AuthServices } from './auth.service';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.loginUser(req.body);
  res.status(201).json({
    success: true,
    message: 'User logged in successfully',
    data: result,
  });
});

export const AuthControllers = {
  loginUser,
};
