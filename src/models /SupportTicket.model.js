import mongoose from "mongoose";

// Define the SupportTicket schema
const supportTicketSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
    validate: {
      validator: function (v) {
        return v instanceof Date;
      },
      message: (props) => `${props.value} is not a valid date format!`,
    },
  },
  severity: {
    type: String,
    required: true,
    default: "Low",
    enum: ["Low", "Medium", "High"],
  },
  type: {
    type: String,
    required: true,
    default: "ITSG",
    enum: ["ITSG", "HR", "HDT"],
  },
  assignedTo: {
    type: String,
  },
  status: {
    type: String,
    required: true,
    default: "New",
    enum: ["New", "Assigned", "Resolved", "Closed"],
  },
  resolvedOn: {
    type: Date,
  },
});

const SupportTicket = mongoose.model("SupportTicket", supportTicketSchema);

export { SupportTicket };
