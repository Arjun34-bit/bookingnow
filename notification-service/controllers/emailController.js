const nodemailer = require("nodemailer");
const Notify = require("../model/Notify");
const { emailDBService } = require("../services/email");

const sendEmail = async (data) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });

    let subjectContent = `Hello ${data?.name.toUpperCase()} Your Booking is Confirmed`;
    let htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Booking Confirmation</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 30px;">

  <table style="max-width: 800px; background: #ffffff; margin: auto; border-radius: 10px; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
    
    <tr>
      <td style="text-align: center; padding-bottom: 30px;">
        <h1 style="background-color:#6495ED;padding:15px">BookingNow</h1>
        <h1 style="color: #2c3e50; margin-bottom: 5px;">Your Booking is Confirmed!</h1>
        <p style="color: #666;">Dear ${
          data.name
        }, thank you for choosing us. We are pleased to confirm your reservation.</p>
      </td>
    </tr>

    <tr>
      <td style="padding: 20px 0;">
        <h2 style="color: #2c3e50; font-size: 18px; border-bottom: 1px solid #ddd; padding-bottom: 8px;">Reservation Summary</h2>
        <p><strong>Check-In:</strong> ${
          data.bookingData.bookingDetails.date.checkInDate.split("T")[0]
        } at ${data.bookingData.bookingDetails.timeout.checkIn}</p>
        <p><strong>Check-Out:</strong> ${
          data.bookingData.bookingDetails.date.checkOutDate.split("T")[0]
        } at ${data.bookingData.bookingDetails.timeout.checkOut}</p>
        <p><strong>Length of Stay:</strong> ${
          data.bookingData.bookingDetails.lengthOfStay
        } night(s)</p>
        <p><strong>Status:</strong> ${data.bookingData.status}</p>
        <p><strong>Payment Method:</strong> ${
          data.bookingData.paymentDetails
        }</p>
        <p><strong>Payment Status:</strong> ${
          data.bookingData.paid ? "Paid" : "Pending"
        }</p>
      </td>
    </tr>

    <tr>
      <td style="padding: 20px 0;">
        <h2 style="color: #2c3e50; font-size: 18px; border-bottom: 1px solid #ddd; padding-bottom: 8px;">Room Details</h2>
        <p><strong>Room:</strong> ${
          data.bookingData.bookingDetails.roomDetails.name
        }</p>
        <p><strong>Number of Rooms:</strong> ${
          data.bookingData.bookingDetails.roomDetails.noOfRoom
        }</p>
        <p><strong>Base Price:</strong> ₹${
          data.bookingData.bookingDetails.roomDetails.basePrice
        }</p>
        <p><strong>Final Price (incl. tax):</strong> ₹${
          data.bookingData.bookingDetails.roomDetails.finalPrice
        }</p>
        <p><strong>Tax:</strong> ₹${
          data.bookingData.bookingDetails.roomDetails.tax
        }</p>
      </td>
    </tr>

    <tr>
      <td style="padding: 20px 0;">
        <h2 style="color: #2c3e50; font-size: 18px; border-bottom: 1px solid #ddd; padding-bottom: 8px;">Cancellation Policy</h2>
        <p><strong>Free cancellation until:</strong> ${
          data.bookingData.bookingDetails.roomDetails.cancellationDetails.date
        } by ${
      data.bookingData.bookingDetails.roomDetails.cancellationDetails.time
    }</p>
      </td>
    </tr>

    <tr>
      <td style="text-align: center; padding: 30px 0;">
        <a href="http://localhost:3000/booking-history" style="display: inline-block; padding: 12px 25px; background-color: #003580; color: #ffffff; border-radius: 5px; text-decoration: none; font-weight: bold;">View Your Booking</a>
        <p style="margin-top: 10px; font-size: 14px; color: #888;">Manage your bookings, contact support, or make changes with just a click.</p>
      </td>
    </tr>

    <tr>
      <td style="text-align: center; padding-top: 20px;">
        <p style="font-size: 12px; color: #aaa;">Need assistance? Our support team is here for you 24/7.</p>
      </td>
    </tr>

  </table>

</body>
</html>`;

    const mailOptions = {
      from: "",
      to: data?.email,
      subject: subjectContent,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);

    await emailDBService(
      data?.email,
      subjectContent,
      "Email Sent Successfully",
      "sent",
      0
    );
  } catch (e) {
    await emailDBService(data?.email, subjectContent, htmlContent, "failed", 1);
  }
};

const notifyUserController = async (req, res) => {
  try {
    const { listingId, unitId, email } = req.body;

    const isUserInNotify = await Notify.findOne({ unitId, email });

    if (isUserInNotify) {
      return res
        .status(400)
        .json({ message: "Remainder Notification Already Set for this room" });
    }

    await Notify.create({ listingId, unitId, email });

    return res.status(200).json({ message: "Remainder Notification Set" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { sendEmail, notifyUserController };
