import { Schema, model, connect } from 'mongoose';
import { guradian, localGuardian, Student, userName } from './student.interface.js';
import validator from 'validator' // Importing the validator library to use its functions for validating input data, such as checking if a string is a valid email address or if it contains only letters.

// Define schema for Student

export const userNameSchema = new Schema<userName>({
    firstName: {
        type: String,
        trim: true,
        required: [true, 'First name is required'],
        maxLength: [20, 'First name cannot exceed 20 characters'],
        // Custom validator to allow only letters in the first name
        validate: {
            validator: function (value: string) {
                return /^[A-Za-z]+$/.test(value); // Regular expression to allow only letters
            },
            message: '{VALUE} is not a valid first name. First name should contain only letters.'

        }
    },
    middleName: {
        type: String,
        trim: true,
        maxLength: [10, 'Middle name cannot exceed 10 characters'],
        validate: {
            validator: (value: string) => {
                return validator.isAlpha(value) // This will allow only letters in the middle name, but no special characters or spaces.

            },
            message: '{VALUE} is not a valid middle name. Middle name should contain only letters and numbers.'
        }


    },
    lastName: {
        type: String, trim: true,
        validate: {
            validator: (value: string) => {
                return validator.isAlpha(value)

            },
            message: '{VALUE} is not a valid last name. Last name should contain only letters and numbers.'


        },
        required: [true, 'Last name is required'], maxLength: [15, 'Last name cannot exceed 15 characters']
    },
}, { _id: false }) // Disable _id for subdocument


export const guradianSchema = new Schema<guradian>({
    fatherName: { type: String, trim: true, required: [true, 'Father name is required'] },
    fatherOccupation: { type: String, trim: true, required: [true, 'Father occupation is required'] },
    fatherContactNo: { type: String, validate: { validator: (value: string) => validator.isMobilePhone(value, 'bn-BD'), message: '{VALUE} is not a valid Bangladeshi contact number.' }, trim: true, required: [true, 'Father contact number is required'] },
    motherName: { type: String, trim: true, required: [true, 'Mother name is required'] },
    motherOccupation: { type: String, trim: true, required: [true, 'Mother occupation is required'] },
    motherContactNo: { type: String, validate: { validator: (value: string) => validator.isMobilePhone(value, 'bn-BD'), message: '{VALUE} is not a valid Bangladeshi contact number.' }, trim: true, required: [true, 'Mother contact number is required'] },
}, { _id: false }) // Disable _id for subdocument

export const localGuardianSchema = new Schema<localGuardian>({
    name: { type: String, trim: true, required: [true, 'local Guardian name is required'] },
    occupation: { type: String, trim: true, required: [true, 'Occupation is required'] },
    contactNo: { type: String, validate: { validator: (value: string) => validator.isMobilePhone(value, 'bn-BD'), message: '{VALUE} is not a valid Bangladeshi contact number.' }, trim: true, required: [true, 'Contact number is required'] },
    address: { type: String, trim: true, required: [true, 'Address is required'] },
}, { _id: false }
)

const studentSchema = new Schema<Student>({
    id: { type: String, required: [true, 'Student ID is required'], unique: [true, 'Student ID must be unique'] },
    name: {
        type: userNameSchema,
        trim: true,
        required: [true, 'Name is required']
    },
    gender: {
        type: String,
        enum: {
            values: ['male', 'female', 'other'],
            message: "'{VALUE}' is not a valid gender. Gender must be one of 'male', 'female', or 'other'."

        },
        trim: true,
        required: [true, 'Gender is required']
    },
    dateOfBirth: { type: String, required: [true, 'Date of birth is required'] },
    email: {
        type: String,
        trim: true,
        required: [true, 'Email is required'],
        unique: [true, 'Email must be unique'],
        immutable: true, // This will make the email field unchangeable after it's set for the first time
        validate: {
            validator: (value: string) => {
                return validator.isEmail(value) // Using the isEmail function from the validator library to check if the provided email is valid.
            },
            message: '{VALUE} is not a valid email address.'
        }
    },
    contactNo: {
        type: String,
        trim: true,
        required: [true, 'Contact number is required'],
        validate: {
            validator: (value: string) => {
                return validator.isMobilePhone(value, 'bn-BD') // Using the isMobilePhone function from the validator library to check if the provided contact number is a valid Bangladeshi mobile phone number.
            },
            message: (props: any) => {
                const value = props.value;

                if (value.length !== 11) {
                    return `${value} must be exactly 11 digits long.`;
                }

                if (!/^01\d{9}$/.test(value)) {
                    return `${value} must start with 01 and contain only digits.`;
                }

                return `${value} is not a valid Bangladeshi contact number.`;
            }
        }
    },
    emergencyContactNo: { type: String, validate: { validator: (value: string) => validator.isMobilePhone(value, 'bn-BD'), message: '{VALUE} is not a valid Bangladeshi contact number.' }, trim: true, required: [true, 'Emergency contact number is required'] },
    bloodGroup: {
        type: String, enum: {
            values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
            trim: true,
            message: "Blood group must be one of 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', or 'O-'"
        }
    },
    presentAddress: { type: String, trim: true, required: [true, 'Present address is required'] },
    permanentAddress: { type: String, trim: true, required: [true, 'Permanent address is required'] },
    guardian: {
        type: guradianSchema,
        required: [true, 'Guardian information is required']
    },
    localGuardian: {
        type: localGuardianSchema,
        required: [true, 'Local guardian information is required']
    },
    profileImage: { type: String },
    isActive: {
        type: String, enum: {
            values: ['active', 'inactive'],
            message: "Active status must be either 'active' or 'inactive'"
        }, required: [true, 'Active status is required'], default: 'active'
    },
}, {
    timestamps: true, // This will automatically add createdAt and updatedAt fields to the schema
    toJSON: { // This will ensure that virtuals are included when converting documents to JSON
        virtuals: true,
    }
});


// Create the Student model
export const StudentModel = model<Student>('Student', studentSchema);
