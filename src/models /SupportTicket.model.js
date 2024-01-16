import mongoose from 'mongoose';



// Define the SupportTicket schema
const supportTicketSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  severity: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  assignedTo: {
    type: String 
  },
  status: {
    type: String,
    required: true,
    default: 'new',
    enum: ['new', 'Assigned', 'resolved', 'closed']
  },
  resolvedOn: {
    type: Date
  }
});


  

const SupportTicket = mongoose.model('SupportTicket', supportTicketSchema);

export { SupportTicket };
