import { ZodError } from 'zod';
import { ErrorSources, genericErrorResponse } from '../interface/error.js';


export const handleZodError = (err: ZodError): genericErrorResponse => {
    const errorSources: ErrorSources = err.issues.map((issue) => ({
        path: issue.path[issue.path.length - 1] as string | number, // Get the last element of the path for better readability
        message: issue.message
    }))
    return {
        statusCode: 400,
        message: 'Validation Error',
        error: errorSources
    };
}