import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppErrors';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // check if the token is present
    if (!token) {
      throw new AppError(401, 'Unauthorized User!');
    }

    // check if the token is valid
    // jwt.verify(
    //   token,
    //   config.jwt_access_secret as string,
    //   function (err, decoded) {
    //     if (err) {
    //       throw new AppError(401, 'Unauthorized User!');
    //     }

    //     const role = (decoded as JwtPayload).data.role;
    //     if (requiredRoles && !requiredRoles.includes(role)) {
    //       throw new AppError(
    //         403,
    //         'You are not allowed to access this resource',
    //       );
    //     }

    //     req.user = decoded as JwtPayload;
    //     next();
    //   },
    // );

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { role, userId, iat } = decoded;

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

    if (
      user.passwordChangedAt &&
      User.isJWTIssuedBeforePasswordChanged(
        user.passwordChangedAt,
        iat as number,
      )
    ) {
      throw new AppError(401, 'Unauthorized User!');
    }

    if (requiredRoles && !requiredRoles.includes(role as TUserRole)) {
      throw new AppError(403, 'You are not allowed to access this resource');
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
