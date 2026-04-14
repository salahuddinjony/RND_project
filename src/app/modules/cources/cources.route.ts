import express from "express";

import validation from "../../middleware/validator/validetResquest.js";
import { courseValidation } from "./cources.validation.js";
import { CourseController } from "./cources.controller.js";

const router = express.Router();

// Define your admin routes here

// Route for creating a course
// router.post('/create-admin', AdminController.createAdmin)

//create course
router.post(
  "/create-course",
  validation(courseValidation.createCourseValidationSchema),
  CourseController.createCource,
);

// Get all courses
router.get("/get-all-cources", CourseController.getAllCources);

// Get course by ID
router.get("/get-course/:id", CourseController.getCourseById);

// update course info
router.patch(
  "/update-course/:id",
  validation(courseValidation.updateCourseValidationSchema),
  CourseController.updateCourseInfo,
);

//delete course
router.delete("/delete-course/:id", CourseController.deleteCourseById);

// restore deleted courses
// router.patch('/restore-deleted-admins', AdminController.restoreDeletedAdmins)

// Export the router to be used in the main app
export const CourseRoute = router;
