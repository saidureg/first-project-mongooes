import { Student } from './student.interface';
import StudentModel from './student.model';

const createStudentIntoDB = async (student: Student): Promise<Student> => {
  const result = await StudentModel.create(student);
  return result;
};

const getAllStudentsFromDB = async (): Promise<Student[]> => {
  const result = await StudentModel.find();
  return result;
};

const getSingleStudentFromDB = async (id: string): Promise<Student> => {
  const result = await StudentModel.findById(id);
  return result;
};

export const StudentService = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
};
