import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import { CreateStudentValidationSchema } from '../student/student.validation';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(CreateStudentValidationSchema),
  UserController.createStudent,
);

export const UserRoutes = router;
