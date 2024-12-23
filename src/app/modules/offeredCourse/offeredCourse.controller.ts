import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { offeredCourseService } from './offeredCourse.service';

const createOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await offeredCourseService.createOfferedCourseIntoDB(req.body);

  res.status(201).json({
    success: true,
    message: 'Offered Course created successfully',
    data: result,
  });
});

export const offeredCourseController = {
  createOfferedCourse,
};
