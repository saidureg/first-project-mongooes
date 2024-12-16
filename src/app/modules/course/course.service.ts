import QueryBuilder from '../../builder/QueryBuilder';
import { CourseSearchableFields } from './course.contant';
import { TCourse } from './course.interface';
import { courseModel } from './course.model';

const createCourseIntoDB = async (payload: TCourse) => {
  const newCourse = await courseModel.create(payload);
  return newCourse;
};

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    courseModel.find().populate('preRequisiteCourses.course'),
    query,
  )
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await courseQuery.modelQuery;
  return result;
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await courseModel.findById(id);
  return result;
};

// const updateCourseIntoDB = async (id: string, payload: TCourse) => {
//   const result = await courseModel.findOneAndUpdate(
//     { id, isDeleted: false },
//     course,
//     { new: true },
//   );
//   return result;
// };

const deleteCourseFromDB = async (id: string) => {
  const result = await courseModel.findByIdAndUpdate(
    { id, isDeleted: false },
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const CourseService = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  deleteCourseFromDB,
};
