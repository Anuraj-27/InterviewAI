package com.interview.platform.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuestionResponse {
    private String questionId;
    private String role;
    private String level;
    private String category;
    private String questionText;
    private String context;
    private List<String> expectedKeyPoints;
}
