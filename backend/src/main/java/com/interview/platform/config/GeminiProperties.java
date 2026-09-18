package com.interview.platform.config;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.validation.annotation.Validated;

@Data
@Validated
@Configuration
@ConfigurationProperties(prefix = "gemini")
public class GeminiProperties {

    @NotBlank(message = "GOOGLE_API_KEY or GEMINI_API_KEY must be provided")
    private String apiKey;

    private String model = "gemini-2.5-flash";
    private float temperature = 0.4f;
    private float evalTemperature = 0.2f;
}
