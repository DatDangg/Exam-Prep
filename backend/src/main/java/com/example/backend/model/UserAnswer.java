package com.example.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class UserAnswer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String userId;
    private String examId;
    private String questionId;

    @Lob
    private String userAnswerJson;
}

