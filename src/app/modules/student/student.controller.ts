import { RequestHandler } from 'express';
import { StudentService } from './student.service';
import catchAsync from '../../utils/catchAsync';

const getSingleStudent = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await StudentService.getSingleStudentFromDB(id);

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
  const { id } = req.params;

  const result = await StudentService.deleteStudentFromDB(id);

  res.status(200).json({
    success: true,
    message: 'Student deleted successfully',
    data: result,
  });
});

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
