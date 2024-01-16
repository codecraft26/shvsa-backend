import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import ApiFeatures from "../utils/apifeatures.js";
import { SupportAgentModel } from "../models /SupportAgent.model.js";

import { SupportTicket } from "../models /SupportTicket.model.js";


//for creating a ticket
export const createSupportTicket = catchAsyncErrors(async (req, res) => {
  const nextAgent = await SupportAgentModel.getNextAgent();

  const ticketData = {
    ...req.body,
    assignedTo: nextAgent._id,
    status: "Assigned",
  };

  const ticket = new SupportTicket(ticketData);
  await ticket.save();

  res.status(201).json({
    ticket,
    message: "Ticket created successfully",
  });
});



//to fetch all tickets
export const getAllTickets = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 10;
  const page = req.query.page || 1;

  const ticketsCount = await SupportTicket.countDocuments();
  if (ticketsCount === 0) {
    res.status(404).json({
      message: "No tickets found",
      success: false,
    });
  }

  const apiFeatures = new ApiFeatures(SupportTicket.find(), req.query)
    .filter()
    .sort()
    .pagination(resultPerPage);
  const tickets = await apiFeatures.query;
  const filteredcount = tickets.length;

  res.status(200).json({
    tickets,
    filteredcount,
    resultPerPage,
    page,
    ticketsCount,
  });
});
