import mongoose from "mongoose";

// Define the schema
const supportAgent = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: function (email) {
      const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      return emailRegex.test(email);
    },
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    maxLength: [12, "Phone number cannot exceed 12 characters"],
    minLength: [10, "Phone number should have 10 characters"],
  },
  description: {
    type: String,
  },
  active: {
    type: Boolean,
    default: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});
// Static field to store last assigned agent ID
supportAgent.statics.lastAssignedAgentId = null;

// Static method to set the last assigned agent ID
supportAgent.statics.setLastAssignedAgentId = function (agentId) {
  this.lastAssignedAgentId = agentId;
};

// Static method to get the next agent
supportAgent.statics.getNextAgent = async function () {
  const agents = await this.find({ active: true }).sort({ dateCreated: 1 });

  if (agents.length === 0) {
    throw new Error("No active agents available");
  }

  const lastAssignedIndex = agents.findIndex((agent) =>
    agent._id.equals(this.lastAssignedAgentId)
  );
  const nextIndex =
    lastAssignedIndex >= 0 && lastAssignedIndex < agents.length - 1
      ? lastAssignedIndex + 1
      : 0;

  const nextAgent = agents[nextIndex];
  this.lastAssignedAgentId = nextAgent._id;

  return nextAgent;
};

// Create the model
const SupportAgentModel = mongoose.model("Supportagent", supportAgent);

export { SupportAgentModel };
