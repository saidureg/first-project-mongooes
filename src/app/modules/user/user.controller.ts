import { RequestHandler } from 'express';
import { UserService } from './user.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

const createStudent: RequestHandler = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;

  //   const zodParsedData = StudentVAlidationSchema.parse(studentData);

  const result = await UserService.createStudentIntoDB(password, studentData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Student created successfully',
    data: result,
  });
});

export const UserController = {
  createStudent,
};
