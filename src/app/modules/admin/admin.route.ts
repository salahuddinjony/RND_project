import express from 'express'

import validation from '../../middleware/validator/validetResquest.js'
import { AdminController } from './admin.controller.js'
import { adminValidation } from './admin.validation.js'

const router = express.Router()

// Define your admin routes here

// Route for creating an admin
// router.post('/create-admin', AdminController.createAdmin)

//create admin
router.post(
    '/create-admin',
    validation(adminValidation.adminSchemaValidation),
    AdminController.CreateAdmin
)

// Get all admins
router.get('/get-all-admins', AdminController.getAllAdmins)


// Get admin by ID
router.get('/get-admin/:id', AdminController.getAdminById)

// update admin info
router.patch(
    '/update-admin/:id',
    validation(adminValidation.adminUpdateValidation),
    AdminController.updateAdminInfo
)

//delete admin
router.delete('/delete-admin/:id', AdminController.deleteAdmin)

// restore deleted admins
// router.patch('/restore-deleted-admins', AdminController.restoreDeletedAdmins)


// Export the router to be used in the main app
export const AdminRoute = router
