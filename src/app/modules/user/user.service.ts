import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import StudentModel from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

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
    throw new Error('Invalid admission semester provided.');
  }

  userData.id = await generateStudentId(admissionSemester);

  // set the student id
  // userData.id = '211015014';

  // create a new user
  const newUser = await User.create(userData);

  // create a new student
  if (Object.keys(newUser).length) {
    // set id,  _id as user
    payload.id = newUser.id;
    payload.user = newUser._id;

    // create a new student
    const newStudent = await StudentModel.create(payload);

    // if new student is not created, then delete the user
    // if (!newStudent) {
    //   await User.findByIdAndDelete(newUser._id);
    // }

    return newStudent;
  }
};

export const UserService = {
  createStudentIntoDB,
};
