import catchAsync from '../../utils/catchAsync';
import { AcademicFacultyService } from './academicFaculty.service';

const createAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyService.createAcademicFacultyIntoDB(
    req.body,
  );
  res.status(201).json({
    status: true,
    message: 'Academic Faculty created successfully',
    data: result,
  });
});

const getAllAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyService.getAllAcademicFacultyFromDB();
  res.status(200).json({
    status: true,
    message: 'All Academic Faculty fetched successfully',
    data: result,
  });
});

const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyService.getSingleAcademicFacultyFromDB(
    req.params.facultyId,
  );
  res.status(200).json({
    status: true,
    message: 'Single Academic Faculty fetched successfully',
    data: result,
  });
});

const updateAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyService.updateAcademicFacultyIntoDB(
    req.params.facultyId,
    req.body,
  );
  res.status(200).json({
    status: true,
    message: 'Academic Faculty updated successfully',
    data: result,
  });
});

export const AcademicFacultyController = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
};
