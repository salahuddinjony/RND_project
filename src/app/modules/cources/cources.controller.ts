import { NextFunction, Request, Response } from "express";
import AppError from "../../errors/handleAppError.js";
import sendResponse from "../../utils/response/responseSend.js";
import catchAsync from "../../utils/CatchAsync.js";
import { checkCommonValidation } from "../../utils/checkCommonValidation.js";
import { CourseService } from "./cources.service.js";

const createCource = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const courseData = req.body; // Get course data from the request body

    const result = await CourseService.createCourseIntoDB(courseData);

    if (result) {
      // Check if result is not null or undefined
      sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Course created successfully",
        data: result,
      });
    } else {
      next(new AppError("Failed to create course", 404));
    }
  },
);

// get all users-GET
const getAllCources = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    const result = await CourseService.getAllCourcesFromDB(query);
    if (result) {
      // Check if result is not null or undefined
      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Courses retrieved successfully",
        data: result,
      });
    } else {
      next(new AppError("Failed to retrieve users", 404));
    }
  },
);

// get user by ID-GET
const getCourseById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const courseId = checkCommonValidation.validateId(
      req.params.id as string,
      next,
    );

    const result = await CourseService.getSingleCourseByIdFromDB(
      courseId as string,
    );
    if (result) {
      // Check if result is not null or undefined
      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Course retrieved successfully",
        data: result,
      });
    } else {
      next(new AppError("Course not found", 404));
    }
  },
);

// update user info-PUT
const updateCourseInfo = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const courseId = checkCommonValidation.validateId(
      req.params.id as string,
      next,
    );
    const updatedData = req.body; // Get updated course data from the request body
    const result = await CourseService.updateCourseByIdInDB(
      courseId as string,
      updatedData,
    );
    if (result) {
      // Check if result is not null or undefined
      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Course updated successfully",
        data: result,
      });
    } else {
      next(new AppError("Course not found", 404));
    }
  },
);

// delete user-DELETE
const deleteCourseById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const courseId = checkCommonValidation.validateId(
      req.params.id as string,
      next,
    );
    const result = await CourseService.deleteCourseByIdInDB(courseId as string);
    if (result) {
      // Check if result is not null or undefined
      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Course deleted successfully",
        data: result,
      });
    } else {
      next(new AppError("Course not found", 404));
    }
  },
);

export const CourseController = {
  createCource,
  getAllCources,
  getCourseById,
  updateCourseInfo,
  deleteCourseById,
};
