import { Request, Response } from 'express';
import { StudentService } from './student.service';

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentService.getAllStudentsFromDB();

    res.status(200).json({
      success: true,
      message: 'All students fetched successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Something went wrong. Please try again later.',
      error: error,
    });
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await StudentService.getSingleStudentFromDB(id);

    res.status(200).json({
      success: true,
      message: 'Student fetched successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Something went wrong. Please try again later.',
      error: error,
    });
  }
};

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
};
