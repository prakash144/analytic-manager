package com.example.analytic_manager.controller;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.micrometer.core.instrument.MeterRegistry;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class ConsumerController {

    private final MeterRegistry meterRegistry;

    public ConsumerController(MeterRegistry meterRegistry) {
        this.meterRegistry = meterRegistry;
    }

    @KafkaListener(
            topics = "analytic-manager-app",
            groupId = "analytic-manager-consumer-group"
    )
    public void consume(String message) throws JsonProcessingException {
        JsonNode event = new ObjectMapper().readTree(message);
        String eventType = event.get("eventType").asText();
        String courseId = event.get("course").get("id").asText();

        if ("COURSE_ENROLL_CLICK".equals(eventType)) {
            meterRegistry.counter("course_enroll_click_total", "courseId", courseId).increment();
        } else if ("PAYMENT_INITIATED".equals(eventType)) {
            meterRegistry.counter("payment_initiated_total", "courseId", courseId).increment();
        }
    }
}

