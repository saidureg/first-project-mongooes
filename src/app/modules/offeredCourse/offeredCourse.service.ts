import AppError from '../../errors/AppErrors';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import { courseModel } from '../course/course.model';
import { Faculty } from '../Faculty/faculty.model';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { TOfferedCourse } from './offeredCourse.interface';
import { OfferedCourse } from './offeredCourse.model';

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    faculty,
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

  const result = await OfferedCourse.create({ ...payload, academicSemester });
  return result;
};

export const offeredCourseService = {
  createOfferedCourseIntoDB,
};
