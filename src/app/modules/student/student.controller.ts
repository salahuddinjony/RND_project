import { NextFunction, Request, Response } from 'express'
import { StudentService } from './student.service.js'
import { validateStudent } from './student.validation.js'
import { error } from 'console'

// Controller function to create a student-POST
const createStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Extract student data from the request body
        const studentData = req.body.student
        // Validate the student data using the validateStudent function before proceeding with the creation process. This will help ensure that the data being saved to the database meets the required criteria and prevents invalid data from being stored.
        //destructuring the error object from the validateStudent function to check if there are any validation errors. If there are errors, we return a 400 Bad Request response with the error details. If there are no errors, we proceed to create the student in the database.
        const { error } = validateStudent(studentData) // This will throw an error if validation fails, which will be caught in the catch block below.
        if (error) {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                error: error.details.map((detail: any) => detail.message).join(', ') // Extract and join all validation error messages into a single string
            })
        }

        // console.log('Received student data:', studentData) // Log the received data for debugging

        // Call the service function to create a student in the database
        const result = await StudentService.createStudentIntoDB(studentData)
        if (result) { // Check if result is not null or undefined
            res.status(201).json({
                success: true,
                message: 'Student created successfully',
                data: result
            })
        } else {
            res.status(404).json({
                success: false,
                message: 'Failed to create student'
            })
        }

    } catch (error) {
        console.error('Error creating student:', error)
        res.status(500).json({
            success: false,
            message: 'Failed to create student',
            error: error instanceof Error ? error.message : 'Unknown error'
        })
    }

}

// Get all students-GET
const getAllStudents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await StudentService.getAllStudentsFromDB()
        if (result) { // Check if result is not null or undefined
            res.status(200).json({
                success: true,
                message: 'Students retrieved successfully',
                data: result
            })
        } else {
            res.status(404).json({
                success: false,
                message: 'No students found'
            })
        }
    } catch (error) {
        console.error('Error retrieving students:', error)
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve students',
            error: error instanceof Error ? error.message : 'Unknown error'
        })
    }
}

// Get student by ID-GET
const getStudentById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const studentId = req.params.id
        const result = await StudentService.getStudentByIdFromDB(studentId as string)
        if (result) {
            res.status(200).json({
                success: true,
                message: 'Student retrieved successfully',
                data: result
            })
        } else {
            res.status(404).json({
                success: false,
                message: 'Student not found'
            })
        }
    } catch (error) {
        console.error('Error retrieving student:', error)
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve student',
            error: error instanceof Error ? error.message : 'Unknown error'
        })
    }
}

// update student-PATCH

const updateStudentInfo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const studentId = req.params.id
        const updatedData = req.body.student
        const result = await StudentService.updateStudentInfoInDB(studentId as string, updatedData)
        if (result) {
            res.status(200).json({
                success: true,
                message: 'Student updated successfully',
                data: result
            })
        } else {
            res.status(404).json({
                success: false,
                message: 'Student not found'
            })
        }
    } catch (error) {
        console.error('Error updating student:', error)
        res.status(500).json({
            success: false,
            message: 'Failed to update student',
            error: error instanceof Error ? error.message : 'Unknown error'
        })
    }
}

// delete student-DELETE
const deleteStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const studentId = req.params.id?.toString().trim() // Ensure studentId is a string and trim any whitespace
        const result = await StudentService.deleteStudentFromDB(studentId as string)
        if (result) {
            res.status(200).json({
                success: true,
                message: 'Student deleted successfully',
                // data: result
            })
        } else {
            res.status(404).json({
                success: false,
                message: 'Student not found'
            })
        }
    } catch (error) {
        console.error('Error deleting student:', error)
        res.status(500).json({
            success: false,
            message: 'Failed to delete student',
            error: error instanceof Error ? error.message : 'Unknown error'
        })
    }

}
export const StudentController = {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudentInfo,
    deleteStudent

}