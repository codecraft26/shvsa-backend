
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import ApiFeatures from "../utils/apifeatures.js";
import { SupportAgentModel} from "../models /SupportAgent.model.js";

import { SupportTicket } from "../models /SupportTicket.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
export const createSupportTicket= catchAsyncErrors(async (req, res) => {

const nextAgent= await SupportAgentModel.getNextAgent();

// Prepare ticket data from the request, and assign the next agent
const ticketData = {
    ...req.body, // assuming ticket details are sent in the request body
    assignedTo: nextAgent._id,
    status: 'Assigned'
  };

  
  const ticket = new SupportTicket(ticketData);
    await ticket.save();
  
    
    // Send back the ticket details using ApiResponse for consistency
    res.status(201).json(
      new ApiResponse(
        201,
        ticket,
        "Ticket created successfully"
      )
    );



});

export const getAllTickets = catchAsyncErrors(async (req, res) => {

    const resultPerPage = 10;
    const page= req.query.page || 1;

    const ticketsCount = await SupportTicket.countDocuments();
    const apiFeatures = new ApiFeatures(SupportTicket.find(), req.query)
        .filter()
        .sort()
        .pagination(resultPerPage);
        const tickets = await apiFeatures.query;
            const filteredcount = tickets.length;
    // Send back the tickets using ApiResponse for consistency
    res.status(200).json(
    {
            tickets, 
            filteredcount,
            resultPerPage,
            page,
            ticketsCount
    } 
    );
    }
);
