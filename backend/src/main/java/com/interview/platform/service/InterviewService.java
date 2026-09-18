package com.interview.platform.service;

import com.interview.platform.dto.EvaluateAnswerRequest;
import com.interview.platform.dto.EvaluationResponse;
import com.interview.platform.dto.QuestionResponse;
import com.interview.platform.dto.StartInterviewRequest;

public interface InterviewService {
    QuestionResponse generateQuestion(StartInterviewRequest request);
    EvaluationResponse evaluateAnswer(EvaluateAnswerRequest request);
}
