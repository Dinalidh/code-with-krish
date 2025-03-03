import { Injectable } from '@nestjs/common';
import { Kafka } from 'kafkajs';
import { partition } from 'rxjs';
@Injectable()
export class NotificationService {
    private readonly kafka = new Kafka({ brokers: ['3.0.159.213:9092']});
    private readonly consumer = this.kafka.consumer({ groupId: 'notification-service'});

    async onModuleInit() {
        await this.consumer.connect();
        await this.consumer.subscribe({ topic:'dinali.order.confirmed'});

        await this.consumer.run({
            eachMessage: async ({ topic, partition, message}) => {
                const orderData = JSON.parse(message.value.toString());
                console.log('Order successfully created:', orderData);
            }
        })
    }


}
