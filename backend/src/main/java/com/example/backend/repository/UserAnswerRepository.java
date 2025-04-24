package com.example.backend.repository;

import com.example.backend.model.UserAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


public interface UserAnswerRepository extends JpaRepository<UserAnswer, Long> {
    List<UserAnswer> findByCompletedExamId(Long completedExamId);
}