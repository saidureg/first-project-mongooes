import { z } from 'zod';

const createAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
      invalid_type_error: 'Academic department must be a string',
    }),
    academicFaculty: z.string({
      required_error: 'Academic faculty is required',
      invalid_type_error: 'Academic faculty must be a string',
    }),
  }),
});

const updateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required',
        invalid_type_error: 'Academic department must be a string',
      })
      .optional(),
    academicFaculty: z
      .string({
        required_error: 'Academic faculty is required',
        invalid_type_error: 'Academic faculty must be a string',
      })
      .optional(),
  }),
});

export const AcademicDepartmentValidation = {
  createAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
};
