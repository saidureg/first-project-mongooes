import AppError from '../../errors/AppErrors';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import { courseModel } from '../course/course.model';
import { Faculty } from '../Faculty/faculty.model';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { TOfferedCourse } from './offeredCourse.interface';
import { OfferedCourse } from './offeredCourse.model';
import { hasTimeConflict } from './offeredCourse.utils';

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    faculty,
    section,
    days,
    startTime,
    endTime,
  } = payload;

  //check if the semester registration Id is exists
  const isSemesterRegistrationExists =
    await SemesterRegistration.findById(semesterRegistration);

  if (!isSemesterRegistrationExists) {
    throw new AppError(404, 'Semester Registration not found');
  }

  const academicSemester = isSemesterRegistrationExists?.academicSemester;

  //check if the academic faculty Id is exists

  const isAcademicFacultyExists =
    await AcademicFaculty.findById(academicFaculty);

  if (!isAcademicFacultyExists) {
    throw new AppError(404, 'Academic Faculty not found');
  }

  //check if the academic department Id is exists

  const isAcademicDepartmentExists =
    await AcademicDepartment.findById(academicDepartment);

  if (!isAcademicDepartmentExists) {
    throw new AppError(404, 'Academic Department not found');
  }

  //check if the course Id is exists

  const isCourseExists = await courseModel.findById(course);

  if (!isCourseExists) {
    throw new AppError(404, 'Course not found');
  }

  //check if the faculty Id is exists

  const isFacultyExists = await Faculty.findById(faculty);

  if (!isFacultyExists) {
    throw new AppError(404, 'Faculty not found');
  }

  // check if the department is under the faculty
  const isDepartmentBelongToFaculty = await AcademicDepartment.findOne({
    _id: academicDepartment,
    academicFaculty,
  });
  if (!isDepartmentBelongToFaculty) {
    throw new AppError(
      400,
      `This ${isAcademicDepartmentExists.name} does not belong to ${isAcademicFacultyExists.name}`,
    );
  }

  // check if the same offered course same section in same registration semester is already exists
  const isSameOfferedCourseExists = await OfferedCourse.findOne({
    semesterRegistration,
    course,
    section,
  });

  if (isSameOfferedCourseExists) {
    throw new AppError(
      400,
      'Offered course with same section in same semester registration already exists',
    );
  }

  // get the schedule of the faculties
  const assignedFaculties = await OfferedCourse.find({
    faculty,
    semesterRegistration,
    days: { $in: days },
  }).select('days startTime endTime');

  // check if the faculty is already assigned in the same time

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConflict(assignedFaculties, newSchedule)) {
    throw new AppError(
      400,
      `This Faculty is not available at that time! Choose another time or days`,
    );
  }

  // another way to check the faculty is already assigned in the same time
  // assignedFaculties.forEach((assignedFaculty) => {
  //   const isDayMatch = payload.days.some((day) =>
  //     assignedFaculty.days.includes(day),
  //   );

  //   if (isDayMatch) {
  //     const isStartTimeMatch =
  //       payload.startTime >= assignedFaculty.startTime &&
  //       payload.startTime <= assignedFaculty.endTime;

  //     const isEndTimeMatch =
  //       payload.endTime >= assignedFaculty.startTime &&
  //       payload.endTime <= assignedFaculty.endTime;

  //     if (isStartTimeMatch || isEndTimeMatch) {
  //       throw new AppError(
  //         400,
  //         `Faculty is already assigned in this time for ${assignedFaculty.days.join(
  //           ', ',
  //         )}`,
  //       );
  //     }
  //   }
  // });

  const result = await OfferedCourse.create({ ...payload, academicSemester });
  return result;
};

const updateOfferedCourseIntoDB = async (
  id: string,
  payload: Pick<TOfferedCourse, 'faculty' | 'days' | 'startTime' | 'endTime'>,
) => {
  const { faculty, days, startTime, endTime } = payload;
  const isOfferedCourseExits = await OfferedCourse.findById(id);

  if (!isOfferedCourseExits) {
    throw new AppError(404, 'Offered Course not found');
  }

  const isFacultyExists = await Faculty.findById(faculty);

  if (!isFacultyExists) {
    throw new AppError(404, 'Faculty not found');
  }

  const semesterRegistration = isOfferedCourseExits.semesterRegistration;

  const semesterRegistrationStatus =
    await SemesterRegistration.findById(semesterRegistration);

  if (semesterRegistrationStatus?.status !== 'UPCOMING') {
    throw new AppError(
      400,
      `You can not update the offered course as it is ${semesterRegistrationStatus?.status} status`,
    );
  }

  const assignedFaculties = await OfferedCourse.find({
    faculty,
    semesterRegistration,
    days: { $in: days },
  }).select('days startTime endTime');

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConflict(assignedFaculties, newSchedule)) {
    throw new AppError(
      400,
      `This Faculty is not available at that time! Choose another time or days`,
    );
  }

  const result = await OfferedCourse.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

export const offeredCourseService = {
  createOfferedCourseIntoDB,
  updateOfferedCourseIntoDB,
};
