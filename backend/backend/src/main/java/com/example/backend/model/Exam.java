package com.example.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Exam {
    @Id
    private String examId;
    private String examName;
    private String createdBy;
    private String createdAt;
}