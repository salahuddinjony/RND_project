// admin zod validation
import { z } from "zod";

const adminSchemaValidation = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long")
}).strict();

const adminUpdateValidation = adminSchemaValidation.partial().strict().refine((data) => Object.keys(data).length > 0, {
    message: 'Provide at least one valid field to update',
});
export const adminValidation = {
    adminSchemaValidation,
    adminUpdateValidation

}