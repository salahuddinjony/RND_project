import e from "express"
import { Student } from "./student.interface.js"
import { StudentModel } from "./student.model.js"


// Service function to create a student in the database
const createStudentIntoDB = async (studentData: Student) => {
    // Simulating saving the student data to the database
    const result = await StudentModel.create(studentData)
    return result // Simulating a successful database save operation
}

// Service function to get all students from the database
const getAllStudentsFromDB = async () => {
    // Simulating fetching all students from the database
    const result = await StudentModel.find()
    return result
}

// Service function to get a student by ID from the database
const getStudentByIdFromDB = async (id: string) => {
    // Simulating fetching a student by ID from the database
    const result = await StudentModel.findById(id)
    return result
}

//update info 
const updateStudentInfoInDB = async (id: string, updatedData: Partial<Omit<Student, 'id' & 'email'>>) => { // here partial means the updatedData can have any subset of the Student properties, making it flexible for updates
      const updatedStudent = await StudentModel.findByIdAndUpdate(id, updatedData, { returnDocument: 'after' }) // This option ensures that the updated document is returned after the update operation is completed
        return updatedStudent
}

// delete student from database
const deleteStudentFromDB = async (id: string) => {
    const deletedStudent = await StudentModel.findByIdAndDelete(id)
    return deletedStudent // This will return the deleted student document if it was found and deleted, or null if no document with the specified ID was found
}
export const StudentService = {
    createStudentIntoDB,
    getAllStudentsFromDB,
    getStudentByIdFromDB,
    updateStudentInfoInDB,
    deleteStudentFromDB
}
