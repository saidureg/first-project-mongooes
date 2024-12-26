import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { offeredCourseValidations } from './offeredCourse.validation';
import { offeredCourseController } from './offeredCourse.controller';

const router = express.Router();

router.post(
  '/create-offered-course',
  validateRequest(offeredCourseValidations.createOfferedCourseValidationSchema),
  offeredCourseController.createOfferedCourse,
);

router.get('/', offeredCourseController.getAllOfferedCourses);

router.get('/:id', offeredCourseController.getSingleOfferedCourse);

router.patch(
  '/:id',
  validateRequest(offeredCourseValidations.updateOfferedCourseValidationSchema),
  offeredCourseController.updateOfferedCourse,
);

router.delete('/:id', offeredCourseController.deleteOfferedCourse);

export const offeredCourseRoutes = router;
