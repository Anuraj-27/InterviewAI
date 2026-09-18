package com.interview.platform.repository;

import com.interview.platform.entity.InterviewSessionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InterviewSessionRepository extends JpaRepository<InterviewSessionEntity, String> {
    List<InterviewSessionEntity> findAllByOrderByCreatedAtDesc();
}
