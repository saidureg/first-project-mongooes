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
    isDeleted: z.boolean().optional(),
  }),
});

const updatePreRequisiteCourseSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});

const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    prefix: z.string().optional(),
    code: z.string().optional(),
    credit: z.number().optional(),
    preRequisiteCourses: z.array(updatePreRequisiteCourseSchema).optional(),
    isDeleted: z.boolean().optional(),
  }),
});

const facultiesWithCourseValidationSchema = z.object({
  body: z.object({
    faculties: z.array(z.string()),
  }),
});

export const CourseValidation = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
  facultiesWithCourseValidationSchema,
};
