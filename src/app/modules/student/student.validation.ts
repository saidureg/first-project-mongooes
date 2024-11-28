import { z } from 'zod';

// StudentName Schema
const StudentNameSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, 'First Name is required. Please provide a valid first name.')
    .max(20, 'First Name cannot be more than 20 characters.')
    .refine(
      (value) => value.charAt(0) === value.charAt(0).toUpperCase(),
      'First Name should start with a capital letter.',
    ),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .trim()
    .min(1, 'Last Name is required. Please provide a valid last name.')
    .max(20, 'Last Name cannot be more than 20 characters.'),
});

// Guardian Schema
const GuardianSchema = z.object({
  fatherName: z
    .string()
    .min(1, 'Father Name is required. Please provide a valid name.'),
  fatherOccupation: z
    .string()
    .min(1, 'Father Occupation is required. Please specify the occupation.'),
  fatherContact: z
    .string()
    .min(
      1,
      'Father Contact is required. Please provide a valid contact number.',
    ),
  motherName: z
    .string()
    .min(1, 'Mother Name is required. Please provide a valid name.'),
  motherOccupation: z
    .string()
    .min(1, 'Mother Occupation is required. Please specify the occupation.'),
  motherContact: z
    .string()
    .min(
      1,
      'Mother Contact is required. Please provide a valid contact number.',
    ),
});

// LocalGuardian Schema
const LocalGuardianSchema = z.object({
  name: z
    .string()
    .min(1, 'Local Guardian Name is required. Please provide a valid name.'),
  occupation: z
    .string()
    .min(
      1,
      'Local Guardian Occupation is required. Please specify the occupation.',
    ),
  contactNo: z
    .string()
    .min(
      1,
      'Local Guardian Contact is required. Please provide a valid contact number.',
    ),
  address: z
    .string()
    .min(
      1,
      'Local Guardian Address is required. Please provide a valid address.',
    ),
});

// Main Student Schema
const StudentVAlidationSchema = z.object({
  id: z
    .string()
    .trim()
    .min(1, 'Student ID is required. Please provide a unique ID.'),
  name: StudentNameSchema,
  gender: z.enum(['male', 'female'], {
    errorMap: () => ({
      message: 'Gender must be either "male" or "female".',
    }),
  }),
  dateOfBirth: z.string().optional(),
  email: z
    .string()
    .trim()
    .email('Email is required. Please provide a valid email address.'),
  contactNumber: z
    .string()
    .trim()
    .min(1, 'Contact Number is required. Please provide a valid number.'),
  emergencyContact: z
    .string()
    .trim()
    .min(
      1,
      'Emergency Contact is required. Please provide a valid emergency number.',
    ),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
      errorMap: (issue) => ({
        message: `${issue.path[0]} is not a valid blood group. Please choose a valid blood group.`,
      }),
    })
    .optional(),
  presentAddress: z
    .string()
    .min(1, 'Present Address is required. Please provide a valid address.'),
  permanentAddress: z
    .string()
    .min(1, 'Permanent Address is required. Please provide a valid address.'),
  guardian: GuardianSchema,
  localGuardian: LocalGuardianSchema,
  profilePicture: z.string().optional(),
  isActive: z
    .enum(['active', 'inactive'], {
      errorMap: () => ({
        message: 'Status must be either "active" or "inactive".',
      }),
    })
    .default('active'),
});

// Exporting the schema
export default StudentVAlidationSchema;
