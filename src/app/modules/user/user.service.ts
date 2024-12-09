import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import StudentModel from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
import AppError from '../../errors/AppErrors';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {};

  // if password is not provided, then set the default password
  userData.password = password || (config.default_password as string);
  // set student role
  userData.role = 'student';

  // generate the student id based on the last student id and year and semester

  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  if (!admissionSemester) {
    throw new AppError(400, 'Admission semester not found');
  }

  const session = await mongoose.startSession();

  try {
    // start the transaction
    session.startTransaction();

    // set generated student id
    userData.id = await generateStudentId(admissionSemester);

    // create a new user (transaction-1)
    const newUser = await User.create([userData], { session });

    // create a new student
    if (!newUser.length) {
      throw new AppError(400, 'Failed to create a new user');
    }
    // set id,  _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    // create a new student (transaction-2)
    const newStudent = await StudentModel.create([payload], { session });

    if (!newStudent.length) {
      throw new AppError(400, 'Failed to create a new student');
    }

    // commit the transaction
    await session.commitTransaction();
    session.endSession();
    return newStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw err;
  }
};

export const UserService = {
  createStudentIntoDB,
};
