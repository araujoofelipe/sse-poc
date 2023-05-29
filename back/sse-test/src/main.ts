import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { KafkaService } from './kafka.service';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const kafkaService = app.get(KafkaService);

  await kafkaService.runConsumer();
  app.enableCors();
  await app.listen(3001);
}
bootstrap();
