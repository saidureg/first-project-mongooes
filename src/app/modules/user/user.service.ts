import config from '../../config';
import { TStudent } from '../student/student.interface';
import StudentModel from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  const userData: Partial<TUser> = {};

  // if password is not provided, then set the default password
  userData.password = password || (config.default_password as string);
  // set student role
  userData.role = 'student';

  // set the student id
  userData.id = '211015014';

  // create a new user
  const newUser = await User.create(userData);

  // create a new student
  if (Object.keys(newUser).length) {
    // set id,  _id as user
    studentData.id = newUser.id;
    studentData.user = newUser._id;

    // create a new student
    const newStudent = await StudentModel.create(studentData);

    // if new student is not created, then delete the user
    if (!newStudent) {
      await User.findByIdAndDelete(newUser._id);
    }

    return newStudent;
  }
};

export const UserService = {
  createStudentIntoDB,
};
