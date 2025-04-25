package com.example.backend.model;

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
}
