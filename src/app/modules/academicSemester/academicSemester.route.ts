import express from 'express';
import { academicSemesterControllers } from './academicSemester.controller';
import validateRequest from '../../middleware/validateRequest';
import { academicSemesterValidations } from './academicSemester.validation';

const router = express.Router();

router.get('/academicSemester', (req, res) => {
  res.send('Hello Academic Semester');
});

router.post(
  '/create-academic-semester',
  validateRequest(
    academicSemesterValidations.createAcademicSemesterValidationSchema,
  ),
  academicSemesterControllers.createAcademicSemester,
);

router.get(
  '/get-academic-semesters',
  academicSemesterControllers.getAllAcademicSemesters,
);

router.get(
  '/get-academic-semester/:semesterId',
  academicSemesterControllers.getSingleAcademicSemester,
);

router.patch(
  '/update-academic-semester/:semesterId',
  validateRequest(
    academicSemesterValidations.createAcademicSemesterValidationSchema,
  ),
  academicSemesterControllers.updateAcademicSemester,
);

export const academicSemesterRoutes = router;
