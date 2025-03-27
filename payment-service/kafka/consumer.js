// const { client } = require("../../server/kafka-service/kafka");

// let consumerInstance;

// const startConsumer = async () => {
//   try {
//     if (!consumerInstance) {
//       // Avoid multiple instances
//       consumerInstance = client.consumer({ groupId: "test-1" });
//       await consumerInstance.connect();
//       console.log("Consumer connected".yellow.bold);

//       await consumerInstance.subscribe({
//         topic: "booking-created",
//         fromBeginning: true,
//       });

//       await consumerInstance.run({
//         eachMessage: async ({ topic, partition, message }) => {
//           console.log(`Received message: ${message.value.toString()}`.yellow);
//         },
//       });

//       // Graceful shutdown on exit
//       process.on("SIGINT", async () => {
//         console.log("Disconnecting consumer...");
//         await consumerInstance.disconnect();
//         process.exit();
//       });
//     }
//   } catch (error) {
//     console.error("Kafka Consumer Error:", error);
//     consumerInstance = null; // Reset instance on failure
//   }
// };

// module.exports = { startConsumer };
