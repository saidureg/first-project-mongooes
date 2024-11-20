import express from 'express';
import { StudentControllers } from './student.controller';

const router = express.Router();

// will call the controller func
router.post('/create-student', StudentControllers.createStudent);
router.get('/', StudentControllers.getAllStudents);
router.get('/:id', StudentControllers.getSingleStudent);

export const StudentRoutes = router;
