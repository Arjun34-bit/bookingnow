const { client } = require("./kafka");

const producer = client.producer();

const kafkaProducer = async (topic, msg) => {
  try {
    await producer.connect();
    console.log("Producer Connected".grey.bold);

    await producer.send({
      topic: topic,
      messages: [{ value: msg }],
    });

    console.log("Message sent to Kafka".gray);
  } catch (error) {
    console.error("Error sending message to Kafka:", error);
  }
};

module.exports = { kafkaProducer };
