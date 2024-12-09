import { RequestHandler } from 'express';
import { StudentService } from './student.service';
import catchAsync from '../../utils/catchAsync';

const getSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;

  const result = await StudentService.getSingleStudentFromDB(studentId);

  res.status(200).json({
    success: true,
    message: 'Student fetched successfully',
    data: result,
  });
});

const getAllStudents: RequestHandler = catchAsync(async (req, res) => {
  const result = await StudentService.getAllStudentsFromDB();

  res.status(200).json({
    success: true,
    message: 'All students fetched successfully',
    data: result,
  });
});

const deleteStudent: RequestHandler = catchAsync(async (req, res) => {
  const { studentId } = req.params;

  const result = await StudentService.deleteStudentFromDB(studentId);

  res.status(200).json({
    success: true,
    message: 'Student deleted successfully',
    data: result,
  });
});

const updateStudent: RequestHandler = catchAsync(async (req, res) => {
  const { studentId } = req.params;

  const result = await StudentService.updateStudentIntoDB(studentId, req.body);

  res.status(200).json({
    success: true,
    message: 'Student updated successfully',
    data: result,
  });
});

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
