import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { semesterRegistrationService } from './semesterRegistration.service';

const createSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await semesterRegistrationService.createSemesterRegistrationIntoDB(
        req.body,
      );

    res.status(201).json({
      success: true,
      message: 'Semester Registration created successfully',
      data: result,
    });
  },
);

const getAllSemesterRegistrations = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await semesterRegistrationService.getAllSemesterRegistrationsFromDB(
        req.query,
      );

    res.status(200).json({
      success: true,
      message: 'Semester Registrations fetched successfully',
      data: result,
    });
  },
);

const getSingleSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await semesterRegistrationService.getSingleSemesterRegistrationFromDB(
        req.params.id,
      );

    res.status(200).json({
      success: true,
      message: 'Semester Registration fetched successfully',
      data: result,
    });
  },
);

const updateSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await semesterRegistrationService.updateSemesterRegistrationIntoDB(
        req.params.id,
        req.body,
      );

    res.status(200).json({
      success: true,
      message: 'Semester Registration updated successfully',
      data: result,
    });
  },
);

export const SemesterRegistrationController = {
  createSemesterRegistration,
  getAllSemesterRegistrations,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
};
