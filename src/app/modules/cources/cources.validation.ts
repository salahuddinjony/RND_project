import z from "zod";

const createCourseValidationSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    prefix: z.string().min(1, "Prefix is required"),
    code: z.string().min(1, "Code is required"),
    credit: z.number().positive("Credit must be a positive number"),
    prerequisiteCources: z
      .array(
        z
          .object({
            course: z.string().min(1, "Course ID is required"), // Assuming course ID is a string
          })
          .strict(),
      )
      .optional(), // Make prerequisite courses optional
  })
  .strict();

const updateCourseValidationSchema = createCourseValidationSchema
  .partial()
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: "Provide at least one valid field to update",
  });
export const courseValidation = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
};
