package com.interview.platform.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.genai.Client;
import com.google.genai.types.GenerateContentConfig;
import com.google.genai.types.GenerateContentResponse;
import com.interview.platform.config.GeminiProperties;
import com.interview.platform.dto.EvaluateAnswerRequest;
import com.interview.platform.dto.EvaluationResponse;
import com.interview.platform.dto.QuestionResponse;
import com.interview.platform.dto.StartInterviewRequest;
import com.interview.platform.exception.AiServiceException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class InterviewServiceImpl implements InterviewService {

    private final Client geminiClient;
    private final GeminiProperties properties;
    private final ObjectMapper objectMapper;

    @Override
    public QuestionResponse generateQuestion(StartInterviewRequest request) {
        log.info("Generating question for role: {}, level: {}", request.getRole(), request.getLevel());

        String prompt = String.format("""
            You are a Principal Engineering Bar-Raiser conducting a technical mock interview.
            Target Role: %s
            Seniority Level: %s

            Generate exactly ONE realistic, deep, and technically rigorous interview question.
            Avoid generic quiz questions; present an engineering problem involving architecture, concurrency, scale, or design trade-offs.

            Return your response ONLY in valid JSON conforming to this format:
            {
              "category": "string (e.g., Concurrency, Distributed Systems, ML Pipelines, Linux Networking)",
              "questionText": "string (detailed problem scenario)",
              "context": "string (context or background)",
              "expectedKeyPoints": ["point 1", "point 2", "point 3", "point 4"]
            }
            """, request.getRole(), request.getLevel());

        try {
            GenerateContentConfig config = GenerateContentConfig.builder()
                    .temperature((double) properties.getTemperature())
                    .responseMimeType("application/json")
                    .build();

            GenerateContentResponse response = geminiClient.models.generateContent(
                    properties.getModel(),
                    prompt,
                    config
            );

            String jsonText = extractJson(response.text());
            QuestionResponse question = objectMapper.readValue(jsonText, QuestionResponse.class);

            question.setQuestionId(UUID.randomUUID().toString());
            question.setRole(request.getRole());
            question.setLevel(request.getLevel());

            return question;
        } catch (Exception ex) {
            log.error("Failed to generate question with Gemini SDK: {}", ex.getMessage(), ex);
            throw new AiServiceException("Failed to generate interview question: " + ex.getMessage(), ex);
        }
    }

    @Override
    public EvaluationResponse evaluateAnswer(EvaluateAnswerRequest request) {
        log.info("Evaluating answer for questionId: {}", request.getQuestionId());

        String prompt = String.format("""
            You are a strict, objective Principal Engineering Interviewer evaluating a candidate's answer.

            Question:
            "%s"

            Expected Key Points & Standards:
            %s

            Candidate's Answer:
            "%s"

            Rubric Criteria (1 to 10 Scale):
            - 9-10: Exceptional depth, addresses edge cases, failure states, trade-offs, and metrics.
            - 7-8: Solid response covering core mechanics with clear articulation.
            - 5-6: Surface-level answer missing critical failure modes or depth.
            - 1-4: Incorrect, hand-waving, or missing core principles.

            Return your response ONLY in valid JSON matching this structure:
            {
              "score": integer (1 to 10),
              "correct": boolean,
              "recommendation": "string (STRONG_HIRE, HIRE, LEANING_HIRE, or NO_HIRE)",
              "strengths": ["string", "string"],
              "improvementAreas": ["string", "string"],
              "feedbackSummary": "string (executive summary for candidate)",
              "idealAnswerSummary": "string (how a staff engineer would answer concisely)"
            }
            """,
            request.getQuestionText(),
            request.getExpectedKeyPoints(),
            request.getUserAnswer()
        );

        try {
            GenerateContentConfig config = GenerateContentConfig.builder()
                    .temperature((double) properties.getEvalTemperature())
                    .responseMimeType("application/json")
                    .build();

            GenerateContentResponse response = geminiClient.models.generateContent(
                    properties.getModel(),
                    prompt,
                    config
            );

            String jsonText = extractJson(response.text());
            EvaluationResponse evaluation = objectMapper.readValue(jsonText, EvaluationResponse.class);
            evaluation.setQuestionId(request.getQuestionId());

            return evaluation;
        } catch (Exception ex) {
            log.error("Failed to evaluate answer with Gemini SDK: {}", ex.getMessage(), ex);
            throw new AiServiceException("Failed to evaluate candidate answer: " + ex.getMessage(), ex);
        }
    }

    private String extractJson(String raw) {
        if (raw == null) return "{}";
        String trimmed = raw.trim();
        if (trimmed.startsWith("```json")) {
            trimmed = trimmed.substring(7);
        } else if (trimmed.startsWith("```")) {
            trimmed = trimmed.substring(3);
        }
        if (trimmed.endsWith("```")) {
            trimmed = trimmed.substring(0, trimmed.length() - 3);
        }
        return trimmed.trim();
    }
}
