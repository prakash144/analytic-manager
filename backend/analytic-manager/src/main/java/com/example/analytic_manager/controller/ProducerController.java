package com.example.analytic_manager.controller;


import jakarta.annotation.PreDestroy;
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.Producer;
import org.springframework.beans.factory.annotation.Value;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Properties;

@RestController
@RequestMapping("/producer")
public class ProducerController {

    private final Producer<String, String> kafkaProducer;

    private static final String TOPIC_NAME = "analytic-manager-app";
    private static final String BOOTSTRAP_SERVERS = "192.168.29.226:9092";


    public ProducerController() {
        Properties props = new Properties();
        props.put("bootstrap.servers", BOOTSTRAP_SERVERS);
        props.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
        props.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");
        this.kafkaProducer = new KafkaProducer<>(props);
    }


    @PostMapping("/event")
    public void sendEventToKafka(@RequestBody String eventData) {
        ProducerRecord<String, String> record = new ProducerRecord<>(TOPIC_NAME, "userEvent", eventData);
        kafkaProducer.send(record, (metadata, exception) -> {
            if (exception != null) {
                System.err.println("Error sending message to Kafka: " + exception.getMessage());
            } else {
                System.out.println("Message sent to Kafka, offset: " + metadata.offset());
            }
        });
    }

    // Properly close producer when bean is destroyed
    @PreDestroy
    public void closeProducer() {
        if (kafkaProducer != null) {
            kafkaProducer.close();
        }
    }
}
