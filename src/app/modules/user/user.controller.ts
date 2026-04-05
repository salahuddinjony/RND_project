import { NextFunction, Request, Response } from 'express'
import { UserService } from './user.service.js'
import { zodValidateUserCreate, zodValidateUserUpdate } from './user.validator.js'
import { Student } from '../student/student.interface.js'
import { zodValidateStudent } from '../student/student.validation.js'

const createStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {password, student: studentData} = req.body // Get user data from the request body
        if (!studentData || typeof studentData !== 'object') {
            res.status(400).json({
                success: false,
                message: 'Student payload is required'
            })
            return
        }
        // ZOD validation (kept as comment by request): 
        const zodValidationResult = zodValidateStudent(studentData)

        // Call the service function to create the user in the database
        const result = await UserService.createStudentIntoDB(password, zodValidationResult as any)

        if (result) { // Check if result is not null or undefined
            res.status(201).json({
                success: true,
                message: 'User created successfully',
                data: result
            })
        } else {
            res.status(404).json({
                success: false,
                message: 'Failed to create user'
            })
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error'
        const statusCode = errorMessage.includes('Validation error') ? 400 : 500
        res.status(statusCode).json({
            success: false,
            message: 'Failed to create user',
            error: errorMessage
        })
    }
}

// get all users-GET
const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await UserService.getAllUsersFromDB()
        if (result) { // Check if result is not null or undefined
            res.status(200).json({
                success: true,
                message: 'Users retrieved successfully',
                data: result
            })
        } else {
            res.status(404).json({
                success: false,
                message: 'Failed to retrieve users'
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve users',
            error: error instanceof Error ? error.message : 'Unknown error'
        })
    }
}

// get user by ID-GET
const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.id // Get user ID from the request parameters
        const result = await UserService.getUserByIdFromDB(userId as string)
        if (result) { // Check if result is not null or undefined
            res.status(200).json({
                success: true,
                message: 'User retrieved successfully',
                data: result
            })
        } else {
            res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve user',
            error: error instanceof Error ? error.message : 'Unknown error'
        })
    }
}

// update user info-PUT
const updateUserInfo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.id // Get user ID from the request parameters
        const updatedData = req.body // Get updated user data from the request body
        const validatedData = zodValidateUserUpdate(updatedData)
        const result = await UserService.updateUserInfoInDB(userId as string, validatedData)
        if (result) { // Check if result is not null or undefined
            res.status(200).json({
                success: true,
                message: 'User updated successfully',
                data: result
            })
        } else {
            res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error'
        const statusCode = errorMessage.includes('Validation error') ? 400 : 500
        res.status(statusCode).json({
            success: false,
            message: 'Failed to update user',
            error: errorMessage
        })
    }
}

// delete user-DELETE
const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.id // Get user ID from the request parameters
        const result = await UserService.deleteUserFromDB(userId as string)
        if (result) { // Check if result is not null or undefined
            res.status(200).json({
                success: true,
                message: 'User deleted successfully',
                data: result
            })
        } else {
            res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete user',
            error: error instanceof Error ? error.message : 'Unknown error'
        })
    }
}

export const UserController = {
    createStudent,
    getAllUsers,
    getUserById,
    updateUserInfo,
    deleteUser
}