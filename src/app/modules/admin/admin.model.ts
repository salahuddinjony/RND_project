import { Schema, model } from "mongoose";
import { Admin } from "./admin.interface.js";
import { applyExcludeFields } from "../../utils/excludeFiledWhenCreateResponse.js";
import { restrictUpdateFieldsChecker } from "../../utils/restrictedUpdateFiled.js";

const AdminSchema = new Schema<Admin>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false, minlength: [6, 'Password must be at least 6 characters long'] },
    isDeleted: { type: Boolean, default: false, select: false }
})
// Exclude password and isDeleted fields when converting to JSON
applyExcludeFields<Admin>(AdminSchema, ['password', 'isDeleted']);
// Update hooks to restrict updating certain fields
restrictUpdateFieldsChecker(AdminSchema, undefined, ["email"]); // This will restrict updating the isDeleted and email fields in the Student schema for the specified update methods.


const AdminModel = model<Admin>('Admin', AdminSchema);
export default AdminModel; 