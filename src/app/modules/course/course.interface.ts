import { Types } from 'mongoose';

export type TPreRequisiteCourses = {
  course: Types.ObjectId;
  isDeleted: boolean;
};

export type TCourse = {
  title: string;
  prefix: string;
  code: string;
  credit: number;
  preRequisiteCourses: TPreRequisiteCourses[];
  isDeleted: boolean;
};