const nodemailer = require("nodemailer");

const sendEmail = async (data) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "cellchat86@gmail.com",
        pass: "lqlwezwpifupnvma",
      },
    });

    let subjectContent = `Hello ${data?.name.toUpperCase()} Your Booking is Confirmed`;
    let htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Booking Confirmation</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f6f6f6; padding: 30px;">

  <table style="max-width: 600px; background: #ffffff; margin: auto; border-radius: 8px; padding: 20px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
    
    <tr>
      <td style="text-align: center; padding-bottom: 20px;">
        <h1 style="color: #003580; margin-bottom: 5px;">Booking Confirmed!</h1>
        <p style="color: #555;">We look forward to hosting you.</p>
      </td>
    </tr>

    <tr>
      <td style="padding: 20px 0;">
        <h2 style="color: #003580; font-size: 18px; border-bottom: 1px solid #eee; padding-bottom: 5px;">Booking Details</h2>
        <p><strong>Check-In:</strong> ${data?.bookingData?.date?.checkInDate} at ${data?.bookingData?.timeout?.checkIn}</p>
        <p><strong>Check-Out:</strong> ${data?.bookingData?.date?.checkOutDate} at ${data?.bookingData?.timeout?.checkOut}</p>
        <p><strong>Length of Stay:</strong> ${data?.bookingData?.lengthOfStay} nights</p>
      </td>
    </tr>

    <tr>
      <td style="padding: 20px 0;">
        <h2 style="color: #003580; font-size: 18px; border-bottom: 1px solid #eee; padding-bottom: 5px;">Room Information</h2>
        <p><strong>Room Name:</strong> ${data?.bookingData?.roomDetails?.name}</p>
        <p><strong>Capacity:</strong> ${data?.bookingData?.roomDetails?.capacity} Guests</p>
        <p><strong>Number of Rooms:</strong> ${data?.bookingData?.roomDetails?.noOfRoom}</p>
        <p><strong>Base Price:</strong> ${data?.bookingData?.roomDetails?.basePrice}</p>
        <p><strong>Final Price (incl. tax):</strong> ${data?.bookingData?.roomDetails?.finalPrice}</p>
        <p><strong>Tax:</strong> ${data?.bookingData?.roomDetails?.tax}</p>
      </td>
    </tr>

    <tr>
      <td style="padding: 20px 0;">
        <h2 style="color: #003580; font-size: 18px; border-bottom: 1px solid #eee; padding-bottom: 5px;">Cancellation Policy</h2>
        <p><strong>Free cancellation until:</strong> ${data?.bookingData?.roomDetails?.cancellationDetails?.date} by ${data?.bookingData?.roomDetails?.cancellationDetails?.time}</p>
      </td>
    </tr>

    <tr>
      <td style="text-align: center; padding-top: 30px;">
        <p style="font-size: 14px; color: #999;">For any questions, contact our support team 24/7.</p>
      </td>
    </tr>

  </table>

</body>
</html>
`;

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

const sendEmailController = async (req, res) => {};

module.exports = { sendEmail, sendEmailController };
