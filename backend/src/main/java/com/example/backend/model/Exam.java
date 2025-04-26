package com.example.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Exam {
    @Id
    private String examId;
    private String examName;
    private String createdBy;
    private String createdAt;
    private String updatedAt;
    private boolean locked = false;

    @Column(nullable = false)
    private int attemptCount = 0;
}
