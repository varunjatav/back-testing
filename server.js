import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import cors from "cors";

const server = express();

dotenv.config();
server.use(cors());
server.use(bodyParser.json());

// Mongo DB Connection Setup

// creating Schema
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const studentSchema = new mongoose.Schema({
  name: String,
  date: String,
  age: String,
  gender: String,
  address: String,
  courses: String,
  courseType: String,
});

const clientSchema = new mongoose.Schema({
    name: String,
    date: String,
    age: String,
    gender: String,
    address: String,
    services: String,
    serviceType: String,
});
// Models
const contactForm = mongoose.model("contact", contactSchema);
const studentForm = mongoose.model("student", studentSchema);
const clientForm = mongoose.model("client", clientSchema);
// Routes

server.post("/contact", async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const contact = new contactForm(req.body.data);
    console.log(req.body.data);
    const doc = await contact.save();
    res.status(201).json(doc);
    // console.log(req.body);
    await sendMail(req.body.data, "Mail Regards Contact of Clients or Students", `${req.body.data.message}\nFrom: ${req.body.data.name}`);
    await  sendMailUser(req.body, "Mail Regards Contact", "Thank you for contacting us!");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

server.post("/student", async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const student = new studentForm(req.body);
    console.log(req.body);
    const doc = await student.save();
    res.status(201).json(doc);
    await sendMail(req.body, "Mail Regards Admission of Students", `A new Student with name: ${req.body.name}, Date of Birth: ${req.body.date}, Age: ${req.body.age}, Gender: ${req.body.gender}, Address: ${req.body.address}, Course Type: ${req.body.courseType}, Course: ${req.body.courses}, Email: ${req.body.email}`);
    await sendMailUser(req.body, "Mail Regards Registration", "Thank you for registration");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

server.post("/client", async (req, res) => {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      const client = new clientForm(req.body);
      // console.log(req.body.data);
      const doc = await client.save();
      res.status(201).json(doc);
      await sendMail(req.body, "Mail Regards Client Services", `A new Client with name: ${req.body.name}, Date of Birth: ${req.body.date}, Age: ${req.body.age}, Gender: ${req.body.gender}, Address: ${req.body.address}, Sevice Type: ${req.body.serviceType}, Service: ${req.body.services}, Email: ${req.body.email}`);
      await sendMailUser(req.body, "Mail Regards Registration", "Thank you for registration");
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });


// Mail sending functions
const sendMail = async (data, subject, text) => {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "mohit.mohit979@gmail.com",
          pass: "wuhp iewj apbv nvnx",
        },
      });
    
      const mailOptions = {
        from: data.email,
        to: "mohit.mohit979@gmail.com , paramcomputers.jhs@gmail.com",
        subject,
        text,
      };
    
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent: " + info.response);
    } catch (error) {
      console.error(error);
    }
  };
  
  const sendMailUser = async (data, subject, text) => {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "mohit.mohit979@gmail.com",
          pass: "wuhp iewj apbv nvnx",
        },
      });
    
      const mailOptions = {
        from: "mohit.mohit979@gmail.com",
        to: data.email,
        subject,
        text,
      };
    
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent: " + info.response);
    } catch (error) {
      console.error(error);
    }
  };

// Get Routes
server.get("/contact", async (req, res) => {
  try {
    const contacts = await contactForm.find();
    res.json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

server.get("/student", async (req, res) => {
  try {
    const students = await studentForm.find();
    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

server.get("/client", async (req, res) => {
    try {
      const client = await clientForm.find();
      res.json(client);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
});

const PORT = 5000;

server.listen(PORT, () => console.log("Server is running on", PORT));
