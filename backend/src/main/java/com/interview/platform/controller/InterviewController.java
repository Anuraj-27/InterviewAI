package com.interview.platform.controller;

import com.interview.platform.dto.EvaluateAnswerRequest;
import com.interview.platform.dto.EvaluationResponse;
import com.interview.platform.dto.QuestionResponse;
import com.interview.platform.dto.StartInterviewRequest;
import com.interview.platform.service.InterviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/interview")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // Match React dev & prod origins
public class InterviewController {

    private final InterviewService interviewService;

    @PostMapping("/start")
    public ResponseEntity<QuestionResponse> startInterview(
            @Valid @RequestBody StartInterviewRequest request) {
        log.info("REST request to start interview: role={}, level={}", request.getRole(), request.getLevel());
        QuestionResponse response = interviewService.generateQuestion(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/evaluate")
    public ResponseEntity<EvaluationResponse> evaluateAnswer(
            @Valid @RequestBody EvaluateAnswerRequest request) {
        log.info("REST request to evaluate answer for questionId={}", request.getQuestionId());
        EvaluationResponse response = interviewService.evaluateAnswer(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/health")
    public ResponseEntity<?> health() {
        return ResponseEntity.ok().body("{\"status\":\"ok\",\"service\":\"Spring Boot Interview Platform\"}");
    }
}
