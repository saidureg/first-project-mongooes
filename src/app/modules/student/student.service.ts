import { TStudent } from './student.interface';
import StudentModel from './student.model';

const getAllStudentsFromDB = async (): Promise<TStudent[]> => {
  const result = await StudentModel.find();
  return result;
};

const getSingleStudentFromDB = async (id: string): Promise<TStudent | null> => {
  const result = await StudentModel.findById(id);
  return result;
};

export const StudentService = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
};
