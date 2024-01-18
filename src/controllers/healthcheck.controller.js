import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";

const healthcheck = catchAsyncErrors(async (req, res, next) => {
  const healthCheck = {
    uptime: process.uptime(),
    message: "ok",
    responsetime: process.hrtime(),
    timestamp: Date.now(),
  };
  try {
    return res.status(200).json({
      success: true,
      message: "Api is properly working",
      data: healthCheck,
    });
  } catch (error) {
    console.error("Error in health check", error);
    healthCheck.message = error;
    throw next(new ErrorHandler(500, "Internal Server Error", healthCheck));
  }
});

export { healthcheck };
