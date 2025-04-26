package com.example.backend.model;

import jakarta.persistence.*;
import lombok.Data;
@Entity
@Data
public class CompletedExam {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userId;
    private String examId;

    private String startTime;
    private String endTime;

    private int correct;
    private int total;
    private double score;

    @ManyToOne
    @JoinColumn(name = "userId", referencedColumnName = "userId", insertable = false, updatable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "examId", referencedColumnName = "examId", insertable = false, updatable = false)
    private Exam exam;
}
