const nodemailer = require("nodemailer");

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

module.exports = { mail };
