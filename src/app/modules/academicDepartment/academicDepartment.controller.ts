import catchAsync from '../../utils/catchAsync';
import { AcademicDepartmentService } from './academicDepartment.service';

const createAcademicDepartment = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentService.createAcademicDepartmentIntoDB(
    req.body,
  );
  res.status(201).json({
    status: true,
    message: 'Academic department created successfully',
    data: result,
  });
});

const getAllAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentService.getAllAcademicDepartmentFromDB();
  res.status(200).json({
    status: true,
    message: 'All academic departments fetched successfully',
    data: result,
  });
});

const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentService.getSingleAcademicDepartmentFromDB(
      req.params.departmentId,
    );
  res.status(200).json({
    status: true,
    message: 'Academic department fetched successfully',
    data: result,
  });
});

const updateAcademicDepartment = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentService.updateAcademicDepartmentIntoDB(
    req.params.departmentId,
    req.body,
  );
  res.status(200).json({
    status: true,
    message: 'Academic department updated successfully',
    data: result,
  });
});

export const AcademicDepartmentController = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
};
