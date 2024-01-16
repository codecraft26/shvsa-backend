

import catchAsyncErrors from '../middleware/catchAsyncErrors.js';
import ErrorHandler from '../utils/errorHandler.js';

import { ApiResponse } from '../utils/ApiResponse.js';
const healthcheck = catchAsyncErrors(async (req, res,next) => {
    const healthCheck = {
        uptime: process.uptime(),
        message: 'ok',
        responsetime: process.hrtime(),
        timestamp: Date.now()
    };
    try {
        return res.status(200).json(
            new ApiResponse(
                200,
                healthCheck,
                "health is good"
            )
        )
    } catch (error) {
        console.error("Error in health check",error)
        healthCheck.message = error;
        throw next(new ErrorHandler(500, 'Internal Server Error', healthCheck));
    }

}
);

export {
    healthcheck
    };


    