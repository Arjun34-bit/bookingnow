const { client } = require("./kafka");
const { updateUnitCount } = require("../controllers/unitController");

let consumerInstance;

const startConsumer = async () => {
  try {
    if (!consumerInstance) {
      // Avoid multiple instances
      consumerInstance = client.consumer({ groupId: "test-1" });
      await consumerInstance.connect();
      console.log("Consumer connected".yellow.bold);

      //   await consumerInstance.subscribe({
      //     topic: "booking-created",
      //     fromBeginning: true,
      //   });

      await consumerInstance.subscribe({
        topic: "unit-maintain",
        fromBeginning: true,
      });

      await consumerInstance.run({
        eachMessage: async ({ topic, partition, message }) => {
          const data = JSON.parse(message.value.toString());
          await updateUnitCount(data);
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
