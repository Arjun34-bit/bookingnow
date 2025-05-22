const { client } = require("./kafka");
const {
  sendEmail,
  notifyUserController,
} = require("../controllers/emailController");

let consumerInstance;

const startConsumer = async () => {
  try {
    if (!consumerInstance) {
      // Avoid multiple instances
      consumerInstance = client.consumer({ groupId: "email-group" });
      await consumerInstance.connect();
      console.log("Consumer connected");

      await consumerInstance.subscribe({
        topic: "email-service",
        fromBeginning: false,
      });

      await consumerInstance.subscribe({
        topic: "booking-cancelled",
        fromBeginning: false,
      });

      await consumerInstance.run({
        eachMessage: async ({ topic, partition, message }) => {
          const data = JSON.parse(message.value.toString());

          switch (topic) {
            case "email-service":
              await sendEmail(data);
              break;
            case "booking-cancelled":
              await notifyUserController(data);
              break;
            default:
              console.warn(`Unhandled topic : ${topic}`);
          }
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
