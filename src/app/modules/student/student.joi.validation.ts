import Joi from 'joi';

// Name Schema
const userNameJoiSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(20)
    .pattern(/^[A-Za-z]+$/)
    .required()
    .messages({
      'string.empty': 'First name is required',
      'string.max': 'First name cannot exceed 20 characters',
      'string.pattern.base': 'First name should contain only letters'
    }),

  middleName: Joi.string()
    .trim()
    .max(10)
    .pattern(/^[A-Za-z]*$/) // optional, only letters
    .allow('')
    .messages({
      'string.max': 'Middle name cannot exceed 10 characters',
      'string.pattern.base': 'Middle name should contain only letters'
    }),

  lastName: Joi.string()
    .trim()
    .max(15)
    .pattern(/^[A-Za-z]+$/)
    .required()
    .messages({
      'string.empty': 'Last name is required',
      'string.max': 'Last name cannot exceed 15 characters',
      'string.pattern.base': 'Last name should contain only letters'
    })
});


//Guardian Schema
const guardianJoiSchema = Joi.object({
  fatherName: Joi.string().trim().required().messages({
    'string.empty': 'Father name is required'
  }),
  fatherOccupation: Joi.string().trim().required().messages({
    'string.empty': 'Father occupation is required'
  }),
  fatherContactNo: Joi.string()
    .pattern(/^01\d{9}$/)
    .required()
    .messages({
      'string.pattern.base': 'Father contact must be valid Bangladeshi number (11 digits, start with 01)',
      'string.empty': 'Father contact number is required'
    }),

  motherName: Joi.string().trim().required(),
  motherOccupation: Joi.string().trim().required(),
  motherContactNo: Joi.string()
    .pattern(/^01\d{9}$/)
    .required()
    .messages({
      'string.pattern.base': 'Mother contact must be valid Bangladeshi number'
    })
});


// Local Guardian Schema
const localGuardianJoiSchema = Joi.object({
  name: Joi.string().trim().required(),
  occupation: Joi.string().trim().required(),
  contactNo: Joi.string()
    .pattern(/^01\d{9}$/)
    .required()
    .messages({
      'string.pattern.base': 'Contact must be valid Bangladeshi number'
    }),
  address: Joi.string().trim().required()
});


// Main Student Schema
export const studentJoiSchema = Joi.object({
  id: Joi.string().required().messages({
    'string.empty': 'Student ID is required'
  }),

  name: userNameJoiSchema.required(),

  gender: Joi.string()
    .valid('male', 'female', 'other')
    .required()
    .messages({
      'any.only': "Gender must be 'male', 'female', or 'other'"
    }),

  dateOfBirth: Joi.string().required(),

  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Invalid email address',
      'string.empty': 'Email is required'
    }),

  contactNo: Joi.string()
    .pattern(/^01\d{9}$/)
    .required()
    .messages({
      'string.pattern.base': 'Contact number must be 11 digits and start with 01'
    }),

  emergencyContactNo: Joi.string()
    .pattern(/^01\d{9}$/)
    .required(),

  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'),

  presentAddress: Joi.string().required(),
  permanentAddress: Joi.string().required(),

  guardian: guardianJoiSchema.required(),
  localGuardian: localGuardianJoiSchema.required(),

  profileImage: Joi.string().optional(),

  isActive: Joi.string()
    .valid('active', 'inactive')
    .default('active')
});

export const validateStudent = (studentData: any) => {
  const { error, value } = studentJoiSchema.validate(studentData, { abortEarly: false }) // This option allows Joi to return all validation errors instead of stopping at the first one.
  if (error) {
    const errorMessages = error.details.map(detail => detail.message)
    throw new Error(`Validation error: ${errorMessages.join(', ')}`)
  }
  return value
}