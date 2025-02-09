import express from 'express';
const router = express.Router();
import mongoose from "mongoose";
import nodemailer from "nodemailer";
var postedData = [];
async function main() {
    try {
      await mongoose.connect(process.env.MONGO_CLIENT_URI);
      //  await Registration.insertMany(student1);
      // console.log(`MongoDB host: ${mongoose.connection.host}`);
      // console.log(data);
      router.post("/", async (req, res) => {
        try {
          console.log(req.body);
          var registration = new Registration();
          registration.name = req.body.name;
          registration.email = req.body.email;
          registration.date = req.body.date;
          registration.age = req.body.age;
          registration.gender = req.body.gender;
          registration.address = req.body.address;
          registration.services = req.body.services;
          registration.serviceType = req.body.serviceType;
          console.log("Registration Obj : ", registration);
  
          const doc = await registration.save();
          console.log(registration);
          postedData.push(doc);
          res.json(doc);
          sendMail(req.body);
          sendMailUser(req.body);
        } catch (error) {
          console.error("Error saving registration data:", error);
          res.status(500).json({ error: "Failed to save registration data" });
        }
  
        // console.log(res);
      });
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    }
  }
  
  main();
  
  const sendMail = (data) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mohit.mohit979@gmail.com",
        pass: "wuhp iewj apbv nvnx",
      },
    });
  
    var mailOptions = {
      from: data.email,
      to: "mohit.mohit979@gmail.com , paramcomputers.jhs@gmail.com",
      subject: "Mail Regards Client Services",
      text:
        "A new Client with name : " +
        data.name +
        " , Date of Birth : " +
        data.date +
        " , Age : " +
        data.age +
        " , Gender : " +
        data.gender +
        " , Address : " +
        data.address +
        " , Sevice Type : " +
        data.serviceType +
        " , Service : " +
        data.services +
        " , Email : " +
        data.email,
    };
  
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  };
  
  const sendMailUser = (data) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mohit.mohit979@gmail.com",
        pass: "wuhp iewj apbv nvnx",
      },
    });
  
    var mailOptions = {
      from: "mohit.mohit979@gmail.com",
      to: data.email,
      subject: "Mail Regards Registration",
      text: "Thankyou for Registration for services",
    };
  
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  };

  router.get("/", (req, res) => {
    res.json(postedData);
  });


  module.exports = router;