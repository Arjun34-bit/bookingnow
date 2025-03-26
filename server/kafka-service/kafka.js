const { Kafka } = require("kafkajs");

exports.client = new Kafka({
  clientId: "book-now",
  brokers: ["192.168.0.105:9092"],
});

// export const producer = kafka.produce();
