const nodemailer = require("nodemailer");

const sgMail = require("@sendgrid/mail");

const dotenv = require("dotenv");

dotenv.config();

const mail = async (email, subject, main) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });

    const mailOptions = {
      from: "",
      to: email,
      subject: subject,
      html: main,
    };

    await transporter.sendMail(mailOptions);

    return true;
  } catch (error) {
    throw error;
  }
};

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const mailSD = async (email, subject, html) => {
  try {
    const msg = {
      to: email,
      from: process.env.SENDER_EMAIL,
      subject: subject,
      html: html,
    };

    await sgMail.send(msg);
    return true;
  } catch (error) {
    // Log SendGrid error details if available
    if (error.response) {
      console.error("SendGrid error:", error.response.body);
    } else {
      console.error("SendGrid error:", error);
    }
    throw error;
  }
};

module.exports = { mail, mailSD };
