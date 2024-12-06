import { model, Schema } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  StudentName,
  TStudent,
} from './student.interface';

const StudentNameSchema = new Schema<StudentName>({
  firstName: {
    type: String,
    trim: true,
    required: [
      true,
      'First Name is required. Please provide a valid first name.',
    ],
    maxlength: [20, 'First Name cannot be more than 20 characters.'],
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      message: 'First Name should start with a capital letter.',
    },
  },
  middleName: { type: String },
  lastName: {
    type: String,
    trim: true,
    required: [
      true,
      'Last Name is required. Please provide a valid last name.',
    ],
    maxlength: [20, 'Last Name cannot be more than 20 characters.'],
  },
});

const GuardianSchema = new Schema<Guardian>({
  fatherName: {
    type: String,
    required: [true, 'Father Name is required. Please provide a valid name.'],
  },
  fatherOccupation: {
    type: String,
    required: [
      true,
      'Father Occupation is required. Please specify the occupation.',
    ],
  },
  fatherContact: {
    type: String,
    required: [
      true,
      'Father Contact is required. Please provide a valid contact number.',
    ],
  },
  motherName: {
    type: String,
    required: [true, 'Mother Name is required. Please provide a valid name.'],
  },
  motherOccupation: {
    type: String,
    required: [
      true,
      'Mother Occupation is required. Please specify the occupation.',
    ],
  },
  motherContact: {
    type: String,
    required: [
      true,
      'Mother Contact is required. Please provide a valid contact number.',
    ],
  },
});

const LocalGuardianSchema = new Schema<LocalGuardian>({
  name: {
    type: String,
    required: [
      true,
      'Local Guardian Name is required. Please provide a valid name.',
    ],
  },
  occupation: {
    type: String,
    required: [
      true,
      'Local Guardian Occupation is required. Please specify the occupation.',
    ],
  },
  contactNo: {
    type: String,
    required: [
      true,
      'Local Guardian Contact is required. Please provide a valid contact number.',
    ],
  },
  address: {
    type: String,
    required: [
      true,
      'Local Guardian Address is required. Please provide a valid address.',
    ],
  },
});

const studentSchema = new Schema<TStudent>(
  {
    id: {
      type: String,
      trim: true,
      required: [true, 'Student ID is required. Please provide a unique ID.'],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User ID is required'],
      ref: 'User',
    },
    name: {
      type: StudentNameSchema,
      required: [
        true,
        'Name is required. Please provide a valid name structure.',
      ],
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female'],
        message:
          '{VALUE} is not a valid gender. Please choose either "male" or "female".',
      },
      required: [true, 'Gender is required. Please specify the gender.'],
    },
    dateOfBirth: { type: String },
    email: {
      type: String,
      trim: true,
      required: [
        true,
        'Email is required. Please provide a valid email address.',
      ],
      unique: true,
    },
    contactNumber: {
      type: String,
      trim: true,
      required: [
        true,
        'Contact Number is required. Please provide a valid number.',
      ],
    },
    emergencyContact: {
      type: String,
      trim: true,
      required: [
        true,
        'Emergency Contact is required. Please provide a valid emergency number.',
      ],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        message:
          '{VALUE} is not a valid blood group. Please choose a valid blood group.',
      },
    },
    presentAddress: {
      type: String,
      required: [
        true,
        'Present Address is required. Please provide a valid address.',
      ],
    },
    permanentAddress: {
      type: String,
      required: [
        true,
        'Permanent Address is required. Please provide a valid address.',
      ],
    },
    guardian: {
      type: GuardianSchema,
      required: [
        true,
        'Guardian details are required. Please provide valid guardian information.',
      ],
    },
    localGuardian: {
      type: LocalGuardianSchema,
      required: [
        true,
        'Local Guardian details are required. Please provide valid local guardian information.',
      ],
    },
    profilePicture: { type: String },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      required: [
        true,
        'Admission Semester is required. Please provide a valid semester ID.',
      ],
      ref: 'AcademicSemester',
    },
  },
  {
    timestamps: true,
  },
);

const StudentModel = model<TStudent>('Student', studentSchema);

export default StudentModel;
