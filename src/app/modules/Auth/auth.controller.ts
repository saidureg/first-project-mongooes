import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { AuthServices } from './auth.service';
import config from '../../config';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.loginUser(req.body);

  const { accessToken, refreshToken, needsPasswordChange } = result;
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: config.NODE_ENV === 'production',
    // sameSite: 'none',
  });

  res.status(201).json({
    success: true,
    message: 'User logged in successfully',
    data: {
      accessToken,
      needsPasswordChange,
    },
  });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const { ...passwordData } = req.body;

  const result = await AuthServices.changePassword(req.user, passwordData);
  res.status(201).json({
    success: true,
    message: 'Password changed successfully',
    data: result,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  const result = await AuthServices.refreshToken(refreshToken);

  res.status(201).json({
    success: true,
    message: 'Token refreshed successfully',
    data: result,
  });
});

export const AuthControllers = {
  loginUser,
  changePassword,
  refreshToken,
};
