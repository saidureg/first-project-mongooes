import mongoose from 'mongoose';
import { TStudent } from './student.interface';
import StudentModel from './student.model';
import AppError from '../../errors/AppErrors';
import { User } from '../user/user.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { studentSearchableFields } from './student.constant';

const getAllStudentsFromDB = async (
  query: Record<string, unknown>,
): Promise<TStudent[]> => {
  // const queryCopy = { ...query };

  // let searchTerm = '';

  // if (query?.searchTerm) {
  //   searchTerm = query.searchTerm as string;
  // }

  // const studentSearchableFields = [
  //   'name.firstName',
  //   'name.lastName',
  //   'email',
  //   'presentAddress',
  // ];

  // const searchQuery = StudentModel.find({
  //   $or: studentSearchableFields.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // });

  // Filtering based on query
  // const excludedFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
  // excludedFields.forEach((field) => delete queryCopy[field]);

  // const filterQuery = searchQuery
  //   .find(queryCopy)
  //   .populate('admissionSemester')
  //   .populate({
  //     path: 'academicDepartment',
  //     populate: {
  //       path: 'academicFaculty',
  //     },
  //   });

  // let sort = '-createdAt';
  // if (query?.sort) {
  //   sort = query.sort as string;
  // }

  // const sortQuery = filterQuery.sort(sort);

  // let page = 1;
  // let limit = 1;
  // let skip = 0;

  // if (query?.limit) {
  //   limit = Number(query.limit);
  // }

  // if (query?.page) {
  //   page = Number(query.page);
  //   skip = (page - 1) * limit;
  // }

  // const paginationQuery = sortQuery.skip(skip);

  // const limitQuery = paginationQuery.limit(limit);

  // field limiting
  // let fields = '-__v';

  // if (query?.fields) {
  //   fields = (query.fields as string).split(',').join(' ');
  // }

  // const fieldQuery = await limitQuery.select(fields);

  // return fieldQuery;

  const studentQuery = new QueryBuilder(StudentModel.find(), query)
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.modelQuery
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });

  return result;
};

const getSingleStudentFromDB = async (id: string): Promise<TStudent | null> => {
  const result = await StudentModel.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deleteStudent = await StudentModel.findOneAndUpdate(
      { id: id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deleteStudent) {
      throw new AppError(400, 'Failed to delete student');
    }

    // const deleteUser = await User.findOneAndUpdate(
    //   { id },
    //   { isDeleted: true },
    //   { new: true, session },
    // );

    // if (!deleteUser) {
    //   throw new AppError(400, 'Failed to delete user');
    // }

    // get user _id from deletedStudent
    const userId = deleteStudent.user;

    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(400, 'Failed to delete user');
    }

    await session.commitTransaction();
    session.endSession();

    return deleteStudent;
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...rest } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...rest,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  const updatedStudent = await StudentModel.findOneAndUpdate(
    { id },
    modifiedUpdatedData,
    { new: true, runValidators: true },
  );

  return updatedStudent;
};

export const StudentService = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  updateStudentIntoDB,
  deleteStudentFromDB,
};
