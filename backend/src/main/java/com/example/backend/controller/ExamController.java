package com.example.backend.controller;

import com.example.backend.model.CompletedExam;
import com.example.backend.model.Exam;
import com.example.backend.model.Question;
import com.example.backend.repository.CompletedExamRepository;
import com.example.backend.repository.ExamRepository;
import com.example.backend.repository.QuestionRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.backend.model.User;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/exams")
public class ExamController {
    @Autowired
    private ExamRepository examRepo;
    @Autowired
    private QuestionRepository questionRepo;
    @Autowired
    private CompletedExamRepository completedRepo;
    @Autowired
    private UserRepository userRepo;

    @PostMapping("/create")
    public Exam createExam(@RequestBody Exam exam) {
        String id = "EXAM" + (examRepo.count() + 1);
        exam.setExamId(id);
        exam.setCreatedAt(LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss")));
        return examRepo.save(exam);
    }

    @GetMapping("/{examId}/detail")
    public Map<String, Object> getExamDetail(@PathVariable String examId) {
        Exam exam = examRepo.findById(examId)
                .orElseThrow(() -> new RuntimeException("Exam not found"));

        List<Question> questions = questionRepo.findByExamId(examId);

        Map<String, Object> result = new HashMap<>();
        result.put("examName", exam.getExamName());
        result.put("questionCount", questions.size());
        result.put("questions", questions);

        return result;
    }

    @GetMapping("/{examId}/completed")
    public List<Map<String, Object>> getUsersCompletedExam(@PathVariable String examId) {
        List<CompletedExam> completed = completedRepo.findByExamId(examId);

        return completed.stream().map(c -> {
            Map<String, Object> m = new HashMap<>();
            User u = userRepo.findById(c.getUserId()).orElse(null);
            m.put("username", u != null ? u.getUsername() : "Unknown");
            m.put("userId", c.getUserId());
            m.put("score", c.getScore());
            m.put("startTime", c.getStartTime());
            m.put("endTime", c.getEndTime());
            return m;
        }).toList();
    }


    @GetMapping
    public List<Exam> getAllExams() {
        return examRepo.findAll();
    }
}
