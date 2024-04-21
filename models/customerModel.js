import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    services: {
      type: String,
      required: true,
    },
    serviceType: {
      type: String,
      required: true,
    },
  });

  const Registration = mongoose.model("registrations", registrationSchema);
  module.exports = Registration;