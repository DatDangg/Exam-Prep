package com.example.backend.repository;

import com.example.backend.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


public interface QuestionRepository extends JpaRepository<Question, String> {
    List<Question> findByExamId(String examId);
    long countByExamId(String examId);
}
