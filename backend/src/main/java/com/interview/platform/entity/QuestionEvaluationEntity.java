package com.interview.platform.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "question_evaluations")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuestionEvaluationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "session_id")
    private InterviewSessionEntity session;

    private String questionId;

    @Column(columnDefinition = "TEXT")
    private String questionText;

    @Column(columnDefinition = "TEXT")
    private String userAnswer;

    private Integer score;

    private Boolean correct;

    @Column(columnDefinition = "TEXT")
    private String feedbackSummary;

    @Column(columnDefinition = "TEXT")
    private String idealAnswerSummary;
}
