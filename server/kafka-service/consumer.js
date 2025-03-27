// const kafka = require("./kafka");

// const consumeMessages = async () => {
//   const consumer = kafka.consumer({ groupId: "test-1" });
//   await consumer.connect();
//   console.log("Consumer connected".purple.bold);

//   await consumer.subscribe({ topic: "booking-created", fromBeginning: true });

//   await consumer.run({
//     eachMessage: async ({ topic, partition, message }) => {
//       console.log(`Received message: ${message.value.toString()}`.purple);
//     },
//   });
// };
