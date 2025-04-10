const { client } = require("./kafka");
const { sendEmail } = require("../controllers/emailController");

let consumerInstance;

const startConsumer = async () => {
  try {
    if (!consumerInstance) {
      // Avoid multiple instances
      consumerInstance = client.consumer({ groupId: "test-1" });
      await consumerInstance.connect();
      console.log("Consumer connected".yellow.bold);

      await consumerInstance.subscribe({
        topic: "email-service",
        fromBeginning: true,
      });

      await consumerInstance.run({
        eachMessage: async ({ topic, partition, message }) => {
          const data = JSON.parse(message.value.toString());
          await sendEmail(data);
        },
      });

      // Graceful shutdown on exit
      process.on("SIGINT", async () => {
        console.log("Disconnecting consumer...");
        await consumerInstance.disconnect();
        process.exit();
      });
    }
  } catch (error) {
    console.error("Kafka Consumer Error:", error);
    consumerInstance = null; // Reset instance on failure
  }
};

module.exports = { startConsumer };
