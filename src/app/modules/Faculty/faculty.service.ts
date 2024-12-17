import { query } from 'express';
import { TFaculty } from './faculty.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import { Faculty } from './faculty.model';
import { FacultySearchableFields } from './faculty.constant';
import mongoose from 'mongoose';
import AppError from '../../errors/AppErrors';
import { User } from '../user/user.model';

const getAllFacultiesFromDB = async (
  query: Record<string, unknown>,
): Promise<TFaculty[]> => {
  const facultyQuery = new QueryBuilder(
    Faculty.find().populate('academicDepartment'),
    query,
  )
    .search(FacultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await facultyQuery.modelQuery;
  return result;
};

const getSingleFacultyFromDB = async (id: string): Promise<TFaculty | null> => {
  const result = await Faculty.findById(id).populate('academicDepartment');
  return result;
};

const updateFacultyInDB = async (
  id: string,
  payload: Partial<TFaculty>,
): Promise<TFaculty | null> => {
  const { name, ...remainingFacultyData } = payload;
  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingFacultyData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  const result = await Faculty.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteFacultyFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deleteFaculty = await Faculty.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deleteFaculty) {
      throw new AppError(400, 'Failed to delete faculty');
    }

    const userId = deleteFaculty.user;

    const deleteUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deleteUser) {
      throw new AppError(400, 'Failed to delete user');
    }

    await session.commitTransaction();
    session.endSession();

    return deleteFaculty;
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};

export const FacultyServices = {
  getAllFacultiesFromDB,
  getSingleFacultyFromDB,
  updateFacultyInDB,
  deleteFacultyFromDB,
};
