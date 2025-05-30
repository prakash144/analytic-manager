package com.example.analytic_manager.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@Component
@ConfigurationProperties(prefix = "kafka")
public class KafkaConfigProperties {
    private String topicName;
    private String consumerGroup;
}