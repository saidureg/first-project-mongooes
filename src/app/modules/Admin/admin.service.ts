import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { AdminSearchableFields } from './admin.constant';
import { TAdmin } from './admin.interface';
import { Admin } from './admin.model';
import AppError from '../../errors/AppErrors';
import { User } from '../user/user.model';

const getAllAdminsFromDB = async (
  query: Record<string, unknown>,
): Promise<TAdmin[]> => {
  const adminQuery = new QueryBuilder(Admin.find(), query)
    .search(AdminSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await adminQuery.modelQuery;
  return result;
};

const getSingleAdminFromDB = async (id: string): Promise<TAdmin | null> => {
  const result = await Admin.findById(id);
  return result;
};

const updateAdminInDB = async (
  id: string,
  payload: Partial<TAdmin>,
): Promise<TAdmin | null> => {
  const { name, ...remainingAdminData } = payload;
  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingAdminData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  const result = await Admin.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteAdminFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deleteAdmin = await Admin.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deleteAdmin) {
      throw new AppError(400, 'Failed to delete Admin');
    }

    const userId = deleteAdmin.user;
    const deleteUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deleteUser) {
      throw new AppError(400, 'Failed to delete User');
    }

    await session.commitTransaction();
    session.endSession();

    return deleteAdmin;
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};

export const AdminService = {
  getAllAdminsFromDB,
  getSingleAdminFromDB,
  updateAdminInDB,
  deleteAdminFromDB,
};
