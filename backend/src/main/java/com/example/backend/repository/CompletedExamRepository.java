package com.example.backend.repository;

import com.example.backend.model.CompletedExam;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CompletedExamRepository extends JpaRepository<CompletedExam, Long> {
    long countByUserId(String userId);
    List<CompletedExam> findByUserId(String userId);
    List<CompletedExam> findByExamId(String examId);
}
