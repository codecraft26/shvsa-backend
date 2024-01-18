import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import ApiFeatures from "../utils/apifeatures.js";
import { SupportAgentModel } from "../models /SupportAgent.model.js";

import { SupportTicket } from "../models /SupportTicket.model.js";


//for creating a ticket
export const createSupportTicket = catchAsyncErrors(async (req, res) => {
  const nextAgent = await SupportAgentModel.getNextAgent();
  const { name, email} = await SupportAgentModel.findById(nextAgent._id);

  const ticketData = {
    ...req.body,
    assignedTo: name,
    status: "Assigned",
  };

  const ticket = new SupportTicket(ticketData);
  await ticket.save();

  res.status(201).json({
    ticket,
    message: "Ticket created successfully",
  });
});

export const getAllTickets = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 10;
  const page = req.query.page || 1;

  // Apply filters and sorting without pagination
  const apiFeatures = new ApiFeatures(SupportTicket.find(), req.query)
    .filter()
    .sort();

  // Get the total count of tickets after applying filters
  const filteredCount = await SupportTicket.countDocuments(apiFeatures.query.getFilter());

  // Apply pagination
  apiFeatures.pagination(resultPerPage);
  const tickets = await apiFeatures.query;

  
  
    res.status(200).json({
      tickets,
      filteredcount: filteredCount, // Use filtered count here
      resultPerPage,
      page,
    });

});
