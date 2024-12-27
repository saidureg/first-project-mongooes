import config from '../../config';
import AppError from '../../errors/AppErrors';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

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
    userId: user?.id,
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

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  const { userId, role } = userData.data;

  const user = await User.isUserExistsByCustomId(userId);

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

  if (!(await User.isPasswordMatched(payload.oldPassword, user?.password))) {
    throw new AppError(401, 'Password is incorrect');
  }

  // hashing the new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await User.findOneAndUpdate(
    {
      id: userId,
      role: role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
      new: true,
    },
  );

  return {};
};

export const AuthServices = {
  loginUser,
  changePassword,
};
