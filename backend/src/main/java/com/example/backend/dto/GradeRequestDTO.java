package com.example.backend.dto;

import lombok.Data;
import java.util.Map;

@Data
public class GradeRequestDTO {
    private String examId;
    private Map<String, Object> answers;
    private String userId;
    private long timeTaken; // tính theo giây
    // getters & setters
}

