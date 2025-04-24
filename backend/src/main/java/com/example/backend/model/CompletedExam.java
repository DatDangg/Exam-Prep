package com.example.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class CompletedExam {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String summaryJson; // optional: chứa tổng hợp chi tiết (nếu muốn lưu gộp)


    private String userId;
    private String examId;

    private String startTime;   // sửa từ String → long
    private String endTime;     // sửa từ String → long

    private int correct;      // ✅ thêm
    private int total;        // ✅ thêm

    private double score;        // sửa từ Double → int nếu bạn muốn dùng điểm nguyên
}
