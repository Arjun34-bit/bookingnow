const { Kafka } = require("kafkajs");

exports.client = new Kafka({
  clientId: "book-now",
  brokers: ["192.168.0.104:9092"],
});
