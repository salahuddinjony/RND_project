import mongoose from "mongoose";
import { paginate, parseListQuery } from "../../builder/queryBuilder.js";
import AppError from "../../errors/handleAppError.js";
import { buildNestedPopulate } from "../../utils/buildNestedPopulate.js";
import { Course } from "./cources.interface.js";
import { CourseModel } from "./cources.model.js";

//create course
const createCourseIntoDB = async (course: Course) => {
  const existingCourse = await CourseModel.findOne({
    title: course.title,
    isDeleted: false,
    code: course.code,
  });

  if (existingCourse) {
    throw new AppError("Course already exists", 400);
  }

  const prerequisiteCourses = course?.prerequisiteCources;

  if (prerequisiteCourses?.length) {
    const invalidIds = prerequisiteCourses.filter(
      (item) => !mongoose.Types.ObjectId.isValid(item.course?.toString()),
    );

    if (invalidIds.length) {
      throw new AppError("Invalid prerequisite course ids", 400);
    }

    // check existence in DB-convert to array
    const ids = prerequisiteCourses.map((p) => p.course);

    const existing = await CourseModel.find({
      _id: { $in: ids },
    });

    if (existing.length !== ids.length) {
      throw new AppError("Some prerequisite courses do not exist", 400);
    }
  }

  return await CourseModel.create(course);
};

//get all courses
const getAllCourcesFromDB = async (query: Record<string, unknown> = {}) => {
  const parsed = parseListQuery(query, {
    searchableFields: ["title", "prefix"],
  });
  const { meta, data: courses } = await paginate(CourseModel, parsed, (q) =>
    q.populate(buildNestedPopulate("prerequisiteCources.course", 10)),
  );
  return { meta, courses };
};

//get single course by id
const getSingleCourseByIdFromDB = async (id: string) => {
  const course = await CourseModel.findById({
    _id: id,
    isDeleted: false,
  }).populate(buildNestedPopulate("prerequisiteCources.course", 10));
  return course;
};

//update course by id
const updateCourseByIdInDB = async (
  id: string,
  updatedData: Partial<Course>,
) => {
  const updatedCourse = await CourseModel.findByIdAndUpdate(
    { _id: id, isDeleted: false },
    updatedData,
    { new: true },
  );
  return updatedCourse;
};

//delete course by id
const deleteCourseByIdInDB = async (id: string) => {
  const deletedCourse = await CourseModel.findByIdAndUpdate(
    { _id: id, isDeleted: false },
    { isDeleted: true },
    { returnDocument: "after" },
  );
  return deletedCourse;
};

export const CourseService = {
  createCourseIntoDB,
  getAllCourcesFromDB,
  getSingleCourseByIdFromDB,
  updateCourseByIdInDB,
  deleteCourseByIdInDB,
};
