import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { CourseValidation } from './course.validation';
import { CourseController } from './course.controller';
import auth from '../../middleware/auth';

const router = express.Router();

router.post(
  '/create-course',
  auth('admin'),
  validateRequest(CourseValidation.createCourseValidationSchema),
  CourseController.createCourse,
);

router.get(
  '/',
  auth('admin', 'faculty', 'student'),
  CourseController.getAllCourses,
);

router.get(
  '/:id',
  auth('admin', 'faculty', 'student'),
  CourseController.getSingleCourse,
);

router.patch(
  '/:id',
  auth('admin'),
  validateRequest(CourseValidation.updateCourseValidationSchema),
  CourseController.updateCourse,
);

router.delete('/:id', auth('admin'), CourseController.deleteCourse);

router.put(
  '/:courseId/assign-faculties',
  auth('admin'),
  validateRequest(CourseValidation.facultiesWithCourseValidationSchema),
  CourseController.assignFacultiesWithCourse,
);

router.delete(
  '/:courseId/remove-faculties',
  auth('admin'),
  validateRequest(CourseValidation.facultiesWithCourseValidationSchema),
  CourseController.removeFacultiesFromCourse,
);

export const courseRoutes = router;
