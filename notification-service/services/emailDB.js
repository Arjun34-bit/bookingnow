const Email = require("../model/Email");

const emailDBService = async (email, subject, content, status, count) => {
  try {
    const eData = await Email.create({
      email: email,
      subject: subject,
      content: content,
      status: status,
      retryCount: count,
    });
    console.log("Email record inserted successfully:", eData);
  } catch (e) {
    console.error("Error inserting email record:", e.message);
  }
};

module.exports = { emailDBService };
