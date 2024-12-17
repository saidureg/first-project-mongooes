import catchAsync from '../../utils/catchAsync';
import { FacultyServices } from './faculty.service';

const getSingleFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await FacultyServices.getSingleFacultyFromDB(id);

  res.status(200).json({
    success: true,
    message: 'Faculty fetched successfully',
    data: result,
  });
});

const getAllFaculties = catchAsync(async (req, res) => {
  const result = await FacultyServices.getAllFacultiesFromDB(req.query);

  res.status(200).json({
    success: true,
    message: 'All faculties fetched successfully',
    data: result,
  });
});

const deleteFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await FacultyServices.deleteFacultyFromDB(id);

  res.status(200).json({
    success: true,
    message: 'Faculty deleted successfully',
    data: result,
  });
});

const updateFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { faculty } = req.body;

  const result = await FacultyServices.updateFacultyInDB(id, faculty);

  res.status(200).json({
    success: true,
    message: 'Faculty updated successfully',
    data: result,
  });
});

export const FacultyControllers = {
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
