package com.example.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class UserAnswer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String examId;     // 👈 để không bị NULL
    private String questionId;
    private String userId;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String answerJson;

    private boolean isCorrect;

    private Long completedExamId;

    @ManyToOne
    @JoinColumn(name = "completedExamId", referencedColumnName = "id", insertable = false, updatable = false)
    private CompletedExam completedExam;

    @ManyToOne
    @JoinColumn(name = "questionId", referencedColumnName = "questionId", insertable = false, updatable = false)
    private Question question;
}
