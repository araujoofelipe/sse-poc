import { Injectable } from '@nestjs/common';
import { Kafka, Producer, Consumer, EachMessagePayload } from 'kafkajs';

@Injectable()
export class KafkaService {
  private kafka: Kafka;
  private producer: Producer;
  private consumer: Consumer;

  constructor() {
    this.kafka = new Kafka({
      clientId: 'sop',
      brokers: ['localhost:9092'],
    });
    this.producer = this.kafka.producer();
    this.consumer = this.kafka.consumer({ groupId: 'sop' });
  }

  async sendMessage(payload: any,topicTosend: string){
    await this.producer.connect()

    await this.producer.send({
        topic: topicTosend,
        messages:[
            { value: JSON.stringify(payload)}
        ]
    })
    await this.producer.disconnect();

  }

  async runConsumer(): Promise<void> {
    await this.consumer.connect();
    await this.consumer.subscribe({ topic: 'sop-receive' });

    await this.consumer.run({
      eachMessage: async (payload: EachMessagePayload) => {
        const { topic, partition, message } = payload;
        const value = message.value?.toString();

        // Process the Kafka message
        console.log(`Received message from topic ${topic}, partition ${partition}: ${value}`);
      },
    });
  }
}

