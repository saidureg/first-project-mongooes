import { z } from 'zod';

const PreRequisiteCourseSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});

const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    prefix: z.string(),
    code: z.string(),
    credit: z.number(),
    preRequisiteCourses: z.array(PreRequisiteCourseSchema).optional(),
  }),
});

export const CourseValidation = {
  createCourseValidationSchema,
};
