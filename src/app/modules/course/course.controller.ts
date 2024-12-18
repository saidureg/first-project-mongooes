import catchAsync from '../../utils/catchAsync';
import { CourseService } from './course.service';

const createCourse = catchAsync(async (req, res) => {
  const result = await CourseService.createCourseIntoDB(req.body);
  res.status(201).json({
    success: true,
    message: 'Course created successfully',
    data: result,
  });
});

const getAllCourses = catchAsync(async (req, res) => {
  const result = await CourseService.getAllCoursesFromDB(req.query);
  res.status(200).json({
    success: true,
    message: 'All Courses fetched successfully',
    data: result,
  });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const result = await CourseService.getSingleCourseFromDB(req.params.id);
  res.status(200).json({
    success: true,
    message: 'Single Course fetched successfully',
    data: result,
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const result = await CourseService.updateCourseIntoDB(
    req.params.id,
    req.body,
  );
  res.status(200).json({
    success: true,
    message: 'Course updated successfully',
    data: result,
  });
});

const deleteCourse = catchAsync(async (req, res) => {
  const result = await CourseService.deleteCourseFromDB(req.params.id);
  res.status(200).json({
    success: true,
    message: 'Course deleted successfully',
    data: result,
  });
});

const assignFacultiesWithCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;
  const result = await CourseService.assignFacultiesWithCourseIntoDB(
    courseId,
    faculties,
  );
  res.status(200).json({
    success: true,
    message: 'Faculties assigned with course successfully',
    data: result,
  });
});

const removeFacultiesFromCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;
  const result = await CourseService.removeFacultiesFromCourseFromDB(
    courseId,
    faculties,
  );
  res.status(200).json({
    success: true,
    message: 'Faculties remove from course successfully',
    data: result,
  });
});

export const CourseController = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
  assignFacultiesWithCourse,
  removeFacultiesFromCourse,
};
