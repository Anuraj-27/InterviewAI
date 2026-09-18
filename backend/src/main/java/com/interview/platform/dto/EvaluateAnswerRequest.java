package com.interview.platform.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EvaluateAnswerRequest {

    @NotBlank(message = "questionId is required")
    private String questionId;

    @NotBlank(message = "questionText is required")
    private String questionText;

    @NotEmpty(message = "expectedKeyPoints cannot be empty")
    private List<String> expectedKeyPoints;

    @NotBlank(message = "userAnswer cannot be empty")
    private String userAnswer;
}
