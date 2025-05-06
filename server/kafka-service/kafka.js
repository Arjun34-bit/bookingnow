const { Kafka } = require("kafkajs");

exports.client = new Kafka({
  clientId: "book-now",
  brokers: ["kafka:9092"],
});
