import catchAsync from '../../utils/catchAsync';
import { academicSemesterServices } from './academicSemester.service';

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await academicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  );
  res.status(200).json({
    success: true,
    message: 'Academic Semester created successfully',
    data: result,
  });
});

const getAllAcademicSemesters = catchAsync(async (req, res) => {
  const result = await academicSemesterServices.getAllAcademicSemestersFromDB();
  res.status(200).json({
    success: true,
    message: 'All Academic Semesters',
    data: result,
  });
});

const getSingleAcademicSemester = catchAsync(async (req, res) => {
  const result = await academicSemesterServices.getSingleAcademicSemesterFromDB(
    req.params.semesterId,
  );
  res.status(200).json({
    success: true,
    message: 'Academic Semester',
    data: result,
  });
});

const updateAcademicSemester = catchAsync(async (req, res) => {
  const result = await academicSemesterServices.updateAcademicSemesterIntoDB(
    req.params.semesterId,
    req.body,
  );
  res.status(200).json({
    success: true,
    message: 'Academic Semester updated successfully',
    data: result,
  });
});

export const academicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemesters,
  getSingleAcademicSemester,
  updateAcademicSemester,
};
