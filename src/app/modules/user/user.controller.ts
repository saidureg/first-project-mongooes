import { Request, Response } from 'express';
import { UserService } from './user.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { password, student: studentData } = req.body;

    //   const zodParsedData = StudentVAlidationSchema.parse(studentData);

    const result = await UserService.createStudentIntoDB(password, studentData);

    res.status(200).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'Something went wrong. Please try again later.',
      error: err,
    });
  }
};

export const UserController = {
  createStudent,
};
