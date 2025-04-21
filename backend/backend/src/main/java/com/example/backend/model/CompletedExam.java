package com.example.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class CompletedExam {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String userId;
    private String examId;
    private String startTime;
    private String endTime;
    private Double score;
}