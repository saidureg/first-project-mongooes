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

const getAllOfferedCourses = catchAsync(async (req: Request, res: Response) => {
  const result = await offeredCourseService.getAllOfferedCoursesFromDB(
    req.query,
  );

  res.status(200).json({
    success: true,
    data: result,
  });
});

const getSingleOfferedCourse = catchAsync(
  async (req: Request, res: Response) => {
    const result = await offeredCourseService.getSingleOfferedCourseFromDB(
      req.params.id,
    );

    res.status(200).json({
      success: true,
      data: result,
    });
  },
);

const updateOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await offeredCourseService.updateOfferedCourseIntoDB(
    req.params.id,
    req.body,
  );

  res.status(200).json({
    success: true,
    message: 'Offered Course updated successfully',
    data: result,
  });
});

const deleteOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  await offeredCourseService.deleteOfferedCourseFromDB(req.params.id);

  res.status(204).json({
    success: true,
    message: 'Offered Course deleted successfully',
  });
});

export const offeredCourseController = {
  createOfferedCourse,
  updateOfferedCourse,
  getAllOfferedCourses,
  getSingleOfferedCourse,
  deleteOfferedCourse,
};
