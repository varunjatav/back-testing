import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const contact = express();
const port = 4000;
contact.use(cors());

contact.use(bodyParser.json());
contact.use(cors());
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const contactForm = mongoose.model("contact", contactSchema);
var postedData = [];
async function main() {
  try {
    await mongoose.connect(process.env.MONGO_CONTACT_URI);
    // console.log(`MongoDB host: ${mongoose.connection.host}`);

    contact.post("/contact", async (req, res) => {
      try {
        var contacts = new contactForm();
        contacts.name = req.body.data.name;
        contacts.email = req.body.data.email;
        contacts.message = req.body.data.message;
        console.log("contacts : ", contacts);
        console.log("request body : ", req.body.data);
        try {
            const doc = await contacts.save();
            postedData.push(doc);
            res.json(doc);
            await sendMail(req.body.data);
            await sendMailUser(req.body.data);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
        
      } catch (error) {
        console.error("Error saving registration data:", error);
        res.status(500).json({ error: "Failed to save registration data" });
      }
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
      subject: "Mail Regards Contact of Clients or Students",
      text:  data.message +  "\n" + "From: "+ data.name,
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
    subject: "Mail Regards Contact",
    text: "Thankyou for Contacting Us!",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};


contact.get("/contact", (req, res) => {
  res.json(postedData);
});

contact.listen(port, () => {
  console.log(`Successfully running on port ${port}`);
});
