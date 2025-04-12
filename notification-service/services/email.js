const Email = require("./model/emailData");

const emailDBService = async (email, subject, status, count) => {
  try {
    const eData = await Email.create({
      email: email,
      subject: subject,
      status: status,
      retryCount: count,
    });
    console.log("Email record inserted successfully:", eData);
  } catch (e) {
    console.error("Error inserting email record:", e.message);
  }
};

module.exports = { emailDBService };
