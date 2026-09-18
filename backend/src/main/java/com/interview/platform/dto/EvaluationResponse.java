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
public class EvaluationResponse {
    private String questionId;
    private int score; // 1 to 10 scale
    private boolean correct;
    private String recommendation; // STRONG_HIRE, HIRE, LEANING_HIRE, NO_HIRE
    private List<String> strengths;
    private List<String> improvementAreas;
    private String feedbackSummary;
    private String idealAnswerSummary;
}
