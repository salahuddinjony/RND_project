import { Schema, model, connect } from 'mongoose';

// Define the Student interface using type alias , also can use interface

export type guradian = {
    fatherName: string;
    fatherOccupation: string;
    fatherContactNo: string;
    motherName: string;
    motherOccupation: string;
    motherContactNo: string;
}
export type localGuardian = {
    name: string;
    occupation: string;
    contactNo: string;
    address: string;
} 

export type userName = {
    firstName: string;
    middleName: string;
    lastName: string;

}
export type Student = {
    id: string;
    name: userName;
    gender: "male" | "female" | "other";
    dateOfBirth: string;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
    presentAddress: string;
    permanentAddress: string;
    guardian: guradian,
    localGuardian: localGuardian,
    profileImage?: string;
    isActive: 'active' | 'inactive';

}


