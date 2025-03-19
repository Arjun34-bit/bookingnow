const { client } = require("./kafka");

exports.createTopics = async () => {
  const admin = client.admin();
  await admin.connect();

  console.log("Kafka Admin Connected".blue);

  try {
    await admin.createTopics({
      topics: [
        { topic: "booking-created", numPartitions: 3 },
        { topic: "payment-processed", numPartitions: 3 },
      ],
    });
    console.log("Kafka topics created successfully!".green.bold);
  } catch (error) {
    console.error("Error creating topics:", error);
  } finally {
    await admin.disconnect();
  }
};

// module.exports = { createTopics };
