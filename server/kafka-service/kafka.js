const { Kafka } = require("kafkajs");

exports.client = new Kafka({
  clientId: "book-now",
  brokers: ["localhost:9092"],
});
