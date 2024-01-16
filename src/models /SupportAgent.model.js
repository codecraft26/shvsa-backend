import mongoose from 'mongoose';

// Define the schema
const supportAgent  = new mongoose.Schema({
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
    }
   
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    maxLength: [12, "Phone number cannot exceed 12 characters"],
    minLength: [10, "Phone number should have 10 characters"],
  },
  description: {
    type: String
  },
  active: {
    type: Boolean,
    default: false
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

// Create the model
const SupportAgentModel = mongoose.model('Supportagent', supportAgent);



export  {SupportAgentModel};