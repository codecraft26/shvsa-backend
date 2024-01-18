import { SupportAgentModel } from "../models /SupportAgent.model.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";

//for creating a support agent
const supportagent = catchAsyncErrors(async (req, res, next) => {
  const { name, email, phone, description } = req.body;

  if (!name || !email || !phone) {
    throw next(new ErrorHandler("Please fill all the fields", 400));
  }

  const agent = await SupportAgentModel.findOne({ email });
  if (agent) {
    throw next(new ErrorHandler("Email already exists", 400));
  }

  const newAgent = new SupportAgentModel({
    name,
    email,
    phone,
    description,
  });

  const savedAgent = await newAgent.save();

  res.status(201).json({
    success: true,
    message: "Agent created successfully",
    data: savedAgent,
  });
});

export { supportagent };

export const getAllAgents = catchAsyncErrors(async (req, res, next) => {
  const agents = await SupportAgentModel.find({});

  if (agents.length === 0) {
    throw next(new ErrorHandler("No agents found", 404));
  }

  const agentNames = agents.map((agent) => agent.name);

  // Send the names in the response
  res.status(200).json({
    success: true,
    agentNames,
  });
});
