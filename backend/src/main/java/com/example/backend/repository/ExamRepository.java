package com.example.backend.repository;

import com.example.backend.model.Exam;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExamRepository extends JpaRepository<Exam, String> {
    long countByCreatedBy(String userId);
}
