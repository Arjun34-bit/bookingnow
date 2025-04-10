const nodemailer = require("nodemailer");

const sendEmail = async (data) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "",
      pass: "",
    },
  });

  const mailOptions = {
    from: "",
    to: data?.email,
    subject: "Your Booking is Confirmed",
    text: "",
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };
