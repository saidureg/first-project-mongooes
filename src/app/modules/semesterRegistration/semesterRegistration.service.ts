import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppErrors';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { SemesterRegistrationStatusEnum } from './semesterRegistration.constant';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester;

  // Check if there any registered semester that is already 'UPCOMING' | 'ONGOING'

  const isThereAnyUpcomingOrOngoingSemester =
    await SemesterRegistration.findOne({
      $or: [
        { status: SemesterRegistrationStatusEnum.UPCOMING },
        { status: SemesterRegistrationStatusEnum.ONGOING },
      ],
    });

  if (isThereAnyUpcomingOrOngoingSemester) {
    throw new AppError(
      400,
      `There is already a semester registration with status ${isThereAnyUpcomingOrOngoingSemester.status}`,
    );
  }

  // Check if academic semester exist
  const isAcademicSemesterExist =
    await AcademicSemester.findById(academicSemester);

  if (!isAcademicSemesterExist) {
    throw new AppError(404, 'Academic Semester not found');
  }

  // Check if semester registration already exist
  const isSemesterRegistrationExist = await SemesterRegistration.findOne({
    academicSemester,
  });

  if (isSemesterRegistrationExist) {
    throw new AppError(400, 'Semester Registration already exist');
  }

  const result = await SemesterRegistration.create(payload);

  return result;
};

const getAllSemesterRegistrationsFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await semesterRegistrationQuery.modelQuery;

  return result;
};

const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result =
    await SemesterRegistration.findById(id).populate('academicSemester');

  return result;
};

const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  // Check if the requested semester registration exist
  const isSemesterRegistrationExist = await SemesterRegistration.findById(id);

  if (!isSemesterRegistrationExist) {
    throw new AppError(404, 'Semester Registration not found');
  }

  // if the requested semester registration is 'ENDED' then it can't be updated
  const currentSemesterStatus = isSemesterRegistrationExist?.status;
  const requestedSemesterStatus = payload?.status;

  if (currentSemesterStatus === SemesterRegistrationStatusEnum.ENDED) {
    throw new AppError(
      400,
      `Semester Registration is already ${currentSemesterStatus}`,
    );
  }

  // UPCOMING --> ONGOING --> ENDED
  if (
    currentSemesterStatus === SemesterRegistrationStatusEnum.UPCOMING &&
    requestedSemesterStatus === SemesterRegistrationStatusEnum.ENDED
  ) {
    throw new AppError(
      400,
      `You can not directly change status from ${currentSemesterStatus} to ${requestedSemesterStatus}`,
    );
  }

  if (
    currentSemesterStatus === SemesterRegistrationStatusEnum.ONGOING &&
    requestedSemesterStatus === SemesterRegistrationStatusEnum.UPCOMING
  ) {
    throw new AppError(
      400,
      `You can not directly change status from ${currentSemesterStatus} to ${requestedSemesterStatus}`,
    );
  }

  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

export const semesterRegistrationService = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationsFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
};
