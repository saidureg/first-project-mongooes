import { z } from 'zod';
import { Days } from './offeredCourse.constant';

const createOfferedCourseValidationSchema = z.object({
  body: z
    .object({
      semesterRegistration: z.string(),
      academicFaculty: z.string(),
      academicDepartment: z.string(),
      course: z.string(),
      faculty: z.string(),
      maxCapacity: z.number(),
      section: z.number(),
      days: z.array(z.enum([...Days] as [string, ...string[]])),
      startTime: z.string().refine(
        (time) => {
          const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
          return timeRegex.test(time);
        },
        {
          message:
            'Invalid time format, please use HH:MM format (24-hour clock)',
        },
      ),
      endTime: z.string().refine(
        (time) => {
          const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
          return timeRegex.test(time);
        },
        {
          message:
            'Invalid time format, please use HH:MM format (24-hour clock)',
        },
      ),
    })
    .refine(
      ({ startTime, endTime }) => {
        const start = new Date(`01/01/2000T${startTime}:00`);
        const end = new Date(`01/01/2000T${endTime}:00`);

        return start < end;
      },
      {
        message: 'Start time must be before end time',
      },
    ),
});

const updateOfferedCourseValidationSchema = z.object({
  body: z.object({
    faculty: z.string().optional(),
    maxCapacity: z.number().optional(),
    days: z.array(z.enum([...Days] as [string, ...string[]])).optional(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
  }),
});

export const offeredCourseValidations = {
  createOfferedCourseValidationSchema,
  updateOfferedCourseValidationSchema,
};
