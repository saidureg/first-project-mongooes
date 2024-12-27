import config from '../../config';
import AppError from '../../errors/AppErrors';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import jwt from 'jsonwebtoken';

const loginUser = async (payload: TLoginUser) => {
  const { id, password } = payload;
  // checking if the user exists
  // const isUserExists = await User.findOne({ id });

  // if (!isUserExists) {
  //   throw new AppError(404, 'This user is not found');
  // }

  const user = await User.isUserExistsByCustomId(id);

  if (!user) {
    throw new AppError(404, 'This user is not found');
  }

  // checking if the user is already deleted
  const isUserDeleted = user?.isDeleted;
  if (isUserDeleted) {
    throw new AppError(403, 'This user is deleted');
  }

  // checking if the user is blocked
  const userStatus = user?.status;
  if (userStatus === 'blocked') {
    throw new AppError(403, 'This user is blocked');
  }

  // checking if the password is correct
  // const isPasswordMatched = await bcrypt.compare(
  //   password,
  //   isUserExists?.password,
  // );

  // if (!isPasswordMatched) {
  //   throw new AppError(401, 'Password is incorrect');
  // }

  if (!(await User.isPasswordMatched(password, user?.password))) {
    throw new AppError(401, 'Password is incorrect');
  }

  const jwtPayload = {
    userId: user,
    role: user?.role,
  };

  const accessToken = jwt.sign(
    {
      data: jwtPayload,
    },
    config.jwt_access_secret as string,
    { expiresIn: '20d' },
  );

  return {
    accessToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};

export const AuthServices = {
  loginUser,
};
