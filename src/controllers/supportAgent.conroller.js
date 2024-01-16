
import { SupportAgentModel } from "../models /SupportAgent.model.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import ErrorHandler from "../utils/errorHandler.js";
import { ApiError } from "../utils/ApiError.js";


 const supportagent = catchAsyncErrors(async (req, res, next) => {
    // Extract data from request body
    const { name, email, phone, description } = req.body;


    if (!name || !email || !phone) {

    throw next (ApiError(400, "Please fill all the fields"))
       
    }
    //check for email is already present or not
    const agent = await SupportAgentModel.findOne({ email });
    if (agent) {
        throw next ( new ApiError(400, "Email already exists"))
    }

    // Create a new instance of the model with the extracted data
    const newAgent = new SupportAgentModel({
        name,
        email,
        phone,
        description,
    });

    // Save the new agent to the database
    const savedAgent = await newAgent.save();

    // Send back the details of the new agent using ApiResponse for consistency
   res.status(201).json(
        new ApiResponse(
            201,
            savedAgent,
            "Agent created successfully"
        )
    );
});


export {supportagent}