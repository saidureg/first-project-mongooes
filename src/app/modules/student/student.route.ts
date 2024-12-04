import express from 'express';
import { StudentControllers } from './student.controller';

const router = express.Router();

// will call the controller func

router.get('/', StudentControllers.getAllStudents);
router.get('/:id', StudentControllers.getSingleStudent);
router.delete('/:id', StudentControllers.getAllStudents);

export const StudentRoutes = router;
